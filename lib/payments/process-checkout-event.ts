import type { Prisma } from '@prisma/client';
import type { PaidCheckoutSession } from './stripe-event';
import { validatePaidCheckoutSession } from './stripe-event';

export async function processPaidCheckoutEvent(
  transaction: Prisma.TransactionClient,
  eventId: string,
  eventType: string,
  session: PaidCheckoutSession,
) {
  const duplicate = await transaction.stripeEvent.findUnique({
    where: { id: eventId },
    select: { id: true },
  });

  if (duplicate) {
    return;
  }

  const orderId = session.metadata?.orderId;
  if (!orderId) {
    throw new Error('ORDER_ID_MISSING');
  }

  const order = await transaction.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new Error('ORDER_NOT_FOUND');
  }

  validatePaidCheckoutSession(session, order.totalCents);

  if (order.stripeCheckoutSessionId !== session.id) {
    throw new Error('CHECKOUT_SESSION_MISMATCH');
  }

  if (order.status !== 'PAID') {
    for (const item of order.items) {
      const updated = await transaction.product.updateMany({
        where: {
          id: item.productId,
          status: 'ACTIVE',
          stock: { gte: item.quantity },
        },
        data: { stock: { decrement: item.quantity } },
      });

      if (updated.count !== 1) {
        throw new Error('INSUFFICIENT_STOCK');
      }
    }

    await transaction.order.update({
      where: { id: order.id },
      data: { status: 'PAID' },
    });
  }

  await transaction.stripeEvent.create({
    data: { id: eventId, type: eventType },
  });
}
