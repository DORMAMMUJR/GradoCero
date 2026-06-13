import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  buildCheckoutOrder,
  CheckoutDomainError,
} from '@/lib/checkout/build-order';
import { getClientIp } from '@/lib/http/client-ip';
import { getPrisma } from '@/lib/prisma';
import { consumeRateLimit } from '@/lib/security/rate-limit';
import { checkoutSchema } from '@/lib/validation/checkout';

let stripeInstance: Stripe | undefined;

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_NOT_CONFIGURED');
  }

  stripeInstance ??= new Stripe(secretKey);
  return stripeInstance;
}

function getApplicationOrigin(request: NextRequest) {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV !== 'production') {
    return request.nextUrl.origin;
  }

  throw new Error('APP_URL_NOT_CONFIGURED');
}

const domainStatus = {
  PRODUCT_NOT_FOUND: 404,
  PRODUCT_NOT_ACTIVE: 409,
  INSUFFICIENT_STOCK: 409,
} as const;

export async function POST(request: NextRequest) {
  const rateLimit = consumeRateLimit(
    `checkout:${getClientIp(request)}`,
    10,
    60_000,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta nuevamente en un minuto.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    const parsed = checkoutSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Los datos del checkout no son válidos.' },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const prisma = getPrisma();
    const products = await prisma.product.findMany({
      where: {
        id: { in: [...new Set(input.items.map((item) => item.productId))] },
      },
      select: {
        id: true,
        sku: true,
        name: true,
        description: true,
        imageUrl: true,
        purchaseCostCents: true,
        stock: true,
        status: true,
      },
    });
    const checkout = buildCheckoutOrder(input.items, products);

    const order = await prisma.$transaction(async (transaction) => {
      const user = await transaction.user.upsert({
        where: { email: input.customer.email },
        update: { name: input.customer.name },
        create: {
          email: input.customer.email,
          name: input.customer.name,
          role: 'CUSTOMER',
        },
      });

      return transaction.order.create({
        data: {
          userId: user.id,
          totalCents: checkout.totalCents,
          items: { create: checkout.orderItems },
        },
      });
    });

    try {
      const session = await getStripe().checkout.sessions.create(
        {
          mode: 'payment',
          line_items: checkout.stripeLineItems,
          customer_email: input.customer.email,
          success_url: `${getApplicationOrigin(request)}/inicio/exito?sessionId={CHECKOUT_SESSION_ID}`,
          cancel_url: `${getApplicationOrigin(request)}/inicio?checkout=cancelled`,
          metadata: {
            orderId: order.id,
          },
        },
        { idempotencyKey: `checkout-${order.id}` },
      );

      if (!session.url) {
        throw new Error('STRIPE_SESSION_URL_MISSING');
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeCheckoutSessionId: session.id },
      });

      return NextResponse.json({ url: session.url });
    } catch (error) {
      await prisma.order.updateMany({
        where: { id: order.id, status: 'PENDING' },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  } catch (error) {
    if (error instanceof CheckoutDomainError) {
      return NextResponse.json(
        { error: error.code },
        { status: domainStatus[error.code] },
      );
    }

    console.error('Checkout failed', error);
    return NextResponse.json(
      { error: 'No fue posible iniciar el pago.' },
      { status: 500 },
    );
  }
}
