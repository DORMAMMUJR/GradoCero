export const DEFAULT_MARKUP_BASIS_POINTS = 3000;

const BASIS_POINTS_DIVISOR = 10_000;

export function calculateSalePriceCents(
  purchaseCostCents: number,
  markupBasisPoints = DEFAULT_MARKUP_BASIS_POINTS,
): number {
  return Math.round(
    purchaseCostCents * (1 + markupBasisPoints / BASIS_POINTS_DIVISOR),
  );
}

export function formatMoney(
  amountCents: number,
  locale = 'es-MX',
  currency = 'MXN',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amountCents / 100);
}
