import { describe, expect, it, vi } from 'vitest';
import { processPaidCheckoutEvent } from './process-checkout-event';

const session = {
  id: 'cs_test_1',
  payment_status: 'paid',
  currency: 'mxn',
  amount_total: 13_000,
  metadata: { orderId: 'order_1' },
};

function transaction(overrides: Record<string, unknown> = {}) {
  return {
    stripeEvent: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({}),
    },
    order: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'order_1',
        status: 'PENDING',
        totalCents: 13_000,
        stripeCheckoutSessionId: 'cs_test_1',
        items: [{ productId: 'product_1', quantity: 2 }],
      }),
      update: vi.fn().mockResolvedValue({}),
    },
    product: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    ...overrides,
  };
}

describe('processPaidCheckoutEvent', () => {
  it('acknowledges duplicate events without mutating stock', async () => {
    const tx = transaction({
      stripeEvent: {
        findUnique: vi.fn().mockResolvedValue({ id: 'evt_1' }),
        create: vi.fn(),
      },
    });

    await processPaidCheckoutEvent(
      tx as never,
      'evt_1',
      'checkout.session.completed',
      session,
    );

    expect(tx.product.updateMany).not.toHaveBeenCalled();
    expect(tx.order.update).not.toHaveBeenCalled();
  });

  it('throws before committing the order or event when stock changed', async () => {
    const tx = transaction({
      product: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
    });

    await expect(
      processPaidCheckoutEvent(
        tx as never,
        'evt_2',
        'checkout.session.completed',
        session,
      ),
    ).rejects.toThrow('INSUFFICIENT_STOCK');

    expect(tx.order.update).not.toHaveBeenCalled();
    expect(tx.stripeEvent.create).not.toHaveBeenCalled();
  });
});
