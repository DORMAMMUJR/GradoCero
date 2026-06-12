import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

// Inicialización de Stripe para Webhooks
const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  return new Stripe(stripeKey, {
    apiVersion: '2025-01-27.acacia' as any,
  });
};

/**
 * Controladora de Webhooks de Stripe para Grado Cero B2B.
 * Este endpoint confirma de forma asíncrona la recepción del pago y actualiza el status en la base de datos de Prisma.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe) {
    console.error("Falta STRIPE_SECRET_KEY en las variables del webhook.");
    return NextResponse.json({ received: false, error: 'Stripe sin configurar en servidor' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      // Verificación estricta de la firma enviado por Stripe
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Si no hay secret, permitimos procesar sin firma únicamente en entornos de desarrollo local
      console.warn("ADVERTENCIA: procesando webhook de Stripe sin verificar firma (Falta STRIPE_WEBHOOK_SECRET). Solo apto para pruebas locales.");
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`⚠️ Error al verificar firma de webhook:`, err.message);
    return NextResponse.json({ received: false, error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Manejar el evento de Checkout Exitoso
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const paymentId = session.id;

    if (orderId) {
      try {
        console.log(`[Webhook] Procesando orden pagada exitosamente. ID Orden: ${orderId}`);

        // Actualizar el estado de la orden a 'PAID' en Prisma
        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'PAID',
            paymentId: paymentId
          },
          include: {
            items: true
          }
        });

        // Opcional: Reducir el inventario (stock) del producto comprado
        for (const item of updatedOrder.items) {
          try {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            });
            console.log(`Stock decrementado para producto ${item.productId} por cantidad de ${item.quantity}`);
          } catch (stockErr) {
            console.error(`No se pudo actualizar el stock del producto ${item.productId}:`, stockErr);
            // No tiramos error para evitar que Stripe intente enviar nuevamente el webhook
          }
        }

        console.log(`La orden ${orderId} fue actualizada exitosamente a 'PAID'.`);
      } catch (dbErr) {
        console.error(`Error de base de datos actualizando la orden ${orderId}:`, dbErr);
        return NextResponse.json({ received: false, error: 'Fallo al actualizar orden en base de datos' }, { status: 500 });
      }
    } else {
      console.warn("No se encontró 'orderId' en los metadatos de la sesión de Stripe.");
    }
  }

  return NextResponse.json({ received: true });
}
