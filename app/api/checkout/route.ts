import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

// Inicialización perezosa (lazy) de Stripe para evitar caídas si la clave de entorno falta.
let stripeInstance: Stripe | null = null;
const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.warn("ADVERTENCIA: La variable de entorno STRIPE_SECRET_KEY no está configurada. Usando el modo de simulación.");
    return null;
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(stripeKey, {
      apiVersion: '2025-01-27.acacia' as any,
    });
  }
  return stripeInstance;
};

/**
 * Endpoint de checkout seguro de Grado Cero B2B.
 * Calcula el total según los precios de la base de datos para evitar modificaciones del cliente.
 */
export async function POST(req: NextRequest) {
  try {
    const origin = req.nextUrl.origin || process.env.APP_URL || 'http://localhost:3000';
    const body = await req.json();
    const { items, user } = body as {
      items: { productId: string; quantity: number }[];
      user: { email: string; name: string; companyName?: string };
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito de compras está vacío' }, { status: 400 });
    }

    if (!user || !user.email) {
      return NextResponse.json({ error: 'Los datos del usuario/cliente son requeridos' }, { status: 400 });
    }

    // 1. Obtener los IDs de los productos involucrados
    const productIds = items.map(item => item.productId);

    // 2. Buscar productos en la base de datos para comprobar precios y existencias reales
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (dbProducts.length === 0) {
      return NextResponse.json({ error: 'Ninguno de los productos coincide con nuestro inventario' }, { status: 404 });
    }

    // 3. Crear o actualizar el usuario registrado como CUSTOMER
    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name || user.email.split('@')[0] },
      create: {
        email: user.email,
        name: user.name || user.email.split('@')[0],
        role: 'CUSTOMER',
      },
    });

    // 4. Calcular el total real basado en costos y el margen estándar (+30%)
    let totalAmount = 0;
    const orderItemsData = [];
    const stripeLineItems = [];

    for (const item of items) {
      const dbProduct = dbProducts.find(p => p.id === item.productId);
      if (!dbProduct) continue;

      // El margen del catálogo es 30% sobre el costo de adquisición
      const finalSalePrice = dbProduct.purchaseCost * 1.30;
      const roundedPrice = Math.round(finalSalePrice * 100) / 100;
      const subtotal = roundedPrice * item.quantity;
      totalAmount += subtotal;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: roundedPrice,
      });

      // Formato para Stripe (Sabor centavos)
      stripeLineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: dbProduct.name,
            description: dbProduct.description || `SKU: ${dbProduct.sku}`,
            images: dbProduct.imageUrl ? [dbProduct.imageUrl] : [],
          },
          unit_amount: Math.round(roundedPrice * 100),
        },
        quantity: item.quantity,
      });
    }

    if (orderItemsData.length === 0) {
      return NextResponse.json({ error: 'No se pudieron procesar los productos del carrito' }, { status: 400 });
    }

    totalAmount = Math.round(totalAmount * 100) / 100;

    // 5. Crear la orden de compra PENDING en Prisma
    const order = await prisma.order.create({
      data: {
        userId: dbUser.id,
        status: 'PENDING',
        total: totalAmount,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 6. Procesamiento de Stripe o Simulación
    const stripe = getStripe();

    if (!stripe) {
      // Modo de simulación para pruebas iniciales o desarrollo en AI Studio sin Stripe keys configuradas todavía.
      console.log(`[SIMULACIÓN] Sesión de pago simulada para la Orden: ${order.id}. Total: $${totalAmount} MXN`);
      
      // Simulamos un retraso de procesamiento leve de red
      await new Promise(resolve => setTimeout(resolve, 500));

      const simulatedURL = `${origin}/inicio/exito?orderId=${order.id}&simulated=true`;
      
      // Actualizamos con un id de transacción simulado
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: `sim_ch_${Math.random().toString(36).substring(2, 12)}` },
      });

      return NextResponse.json({ url: simulatedURL, simulated: true });
    }

    // Crear sesión de Stripe real
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      mode: 'payment',
      customer_email: user.email,
      success_url: `${origin}/inicio/exito?orderId=${order.id}`,
      cancel_url: `${origin}/inicio?canceled=true`,
      metadata: {
        orderId: order.id,
        userEmail: user.email,
      },
    });

    // Guardar el id de sesión de la pasarela en la orden
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: session.id },
    });

    return NextResponse.json({ url: session.url, simulated: false });

  } catch (error: any) {
    console.error("Error en el checkout api controller:", error);
    return NextResponse.json(
      { error: 'Error procesando tu orden de compra', details: error.message },
      { status: 500 }
    );
  }
}
