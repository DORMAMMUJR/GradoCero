import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { processPaidCheckoutEvent } from '@/lib/payments/process-checkout-event';
import { getPrisma } from '@/lib/prisma';

let stripeInstance: Stripe | undefined;

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_NOT_CONFIGURED');
  }

  stripeInstance ??= new Stripe(secretKey);
  return stripeInstance;
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    console.error('Stripe webhook secrets are not configured');
    return NextResponse.json(
      { received: false, error: 'Webhook no configurado.' },
      { status: 503 },
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      request.headers.get('stripe-signature') ?? '',
      webhookSecret,
    );
  } catch (error) {
    console.warn('Stripe webhook signature rejected', error);
    return NextResponse.json(
      { received: false, error: 'Firma de webhook inválida.' },
      { status: 400 },
    );
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  try {
    const session = event.data.object;
    const prisma = getPrisma();
    await prisma.$transaction((transaction) =>
      processPaidCheckoutEvent(transaction, event.id, event.type, session),
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json({ received: true });
    }

    console.error('Stripe webhook processing failed', error);
    return NextResponse.json(
      { received: false, error: 'No fue posible procesar el evento.' },
      { status: 500 },
    );
  }
}
