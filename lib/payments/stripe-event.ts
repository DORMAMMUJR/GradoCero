export type PaidCheckoutSession = {
  id: string;
  payment_status: string;
  currency: string | null;
  amount_total: number | null;
  metadata: Record<string, string> | null;
};

export function validatePaidCheckoutSession(
  session: PaidCheckoutSession,
  expectedTotalCents: number,
) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Error('ORDER_ID_MISSING');
  }
  if (session.payment_status !== 'paid') {
    throw new Error('PAYMENT_NOT_COMPLETED');
  }
  if (session.currency?.toLowerCase() !== 'mxn') {
    throw new Error('PAYMENT_CURRENCY_MISMATCH');
  }
  if (session.amount_total !== expectedTotalCents) {
    throw new Error('PAYMENT_AMOUNT_MISMATCH');
  }

  return {
    orderId,
    paymentId: session.id,
  };
}
