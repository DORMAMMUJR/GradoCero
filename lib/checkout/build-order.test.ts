import { describe, expect, it } from 'vitest';
import { buildCheckoutOrder, CheckoutDomainError } from './build-order';

const products = [
  {
    id: 'product-1',
    sku: 'QUI-001',
    name: 'Producto activo',
    description: null,
    imageUrl: null,
    purchaseCostCents: 10_000,
    stock: 5,
    status: 'ACTIVE' as const,
  },
];

describe('buildCheckoutOrder', () => {
  it('calculates trusted line items and total from database products', () => {
    const result = buildCheckoutOrder(
      [{ productId: 'product-1', quantity: 2 }],
      products,
    );

    expect(result.totalCents).toBe(26_000);
    expect(result.orderItems).toEqual([
      { productId: 'product-1', quantity: 2, priceCents: 13_000 },
    ]);
  });

  it('rejects missing products instead of silently skipping them', () => {
    expect(() =>
      buildCheckoutOrder([{ productId: 'missing', quantity: 1 }], products),
    ).toThrowError(new CheckoutDomainError('PRODUCT_NOT_FOUND'));
  });

  it('rejects insufficient stock', () => {
    expect(() =>
      buildCheckoutOrder([{ productId: 'product-1', quantity: 6 }], products),
    ).toThrowError(new CheckoutDomainError('INSUFFICIENT_STOCK'));
  });

  it('aggregates duplicate product quantities before checking stock', () => {
    expect(() =>
      buildCheckoutOrder(
        [
          { productId: 'product-1', quantity: 3 },
          { productId: 'product-1', quantity: 3 },
        ],
        products,
      ),
    ).toThrowError(new CheckoutDomainError('INSUFFICIENT_STOCK'));
  });
});
