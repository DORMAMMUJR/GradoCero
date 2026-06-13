import { describe, expect, it } from 'vitest';
import { validatePaidCheckoutSession } from './stripe-event';

describe('validatePaidCheckoutSession', () => {
  const session = {
    id: 'cs_test_123',
    payment_status: 'paid',
    currency: 'mxn',
    amount_total: 26_000,
    metadata: { orderId: 'order-1' },
  };

  it('returns the verified order identifier', () => {
    expect(validatePaidCheckoutSession(session, 26_000)).toEqual({
      orderId: 'order-1',
      paymentId: 'cs_test_123',
    });
  });

  it('rejects unpaid sessions', () => {
    expect(() =>
      validatePaidCheckoutSession(
        { ...session, payment_status: 'unpaid' },
        26_000,
      ),
    ).toThrow('PAYMENT_NOT_COMPLETED');
  });

  it('rejects amount mismatches', () => {
    expect(() => validatePaidCheckoutSession(session, 25_999)).toThrow(
      'PAYMENT_AMOUNT_MISMATCH',
    );
  });
});
