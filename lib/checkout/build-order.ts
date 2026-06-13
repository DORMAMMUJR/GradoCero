import { calculateSalePriceCents } from '@/lib/pricing';

type RequestedItem = {
  productId: string;
  quantity: number;
};

type CheckoutProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  purchaseCostCents: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
};

export type CheckoutDomainErrorCode =
  | 'PRODUCT_NOT_FOUND'
  | 'PRODUCT_NOT_ACTIVE'
  | 'INSUFFICIENT_STOCK';

export class CheckoutDomainError extends Error {
  constructor(public readonly code: CheckoutDomainErrorCode) {
    super(code);
    this.name = 'CheckoutDomainError';
  }
}

export function buildCheckoutOrder(
  requestedItems: RequestedItem[],
  products: CheckoutProduct[],
) {
  const productsById = new Map(products.map((product) => [product.id, product]));
  const quantitiesByProduct = new Map<string, number>();

  for (const item of requestedItems) {
    quantitiesByProduct.set(
      item.productId,
      (quantitiesByProduct.get(item.productId) ?? 0) + item.quantity,
    );
  }

  const orderItems = Array.from(quantitiesByProduct).map(
    ([productId, quantity]) => {
      const product = productsById.get(productId);

      if (!product) {
        throw new CheckoutDomainError('PRODUCT_NOT_FOUND');
      }
      if (product.status !== 'ACTIVE') {
        throw new CheckoutDomainError('PRODUCT_NOT_ACTIVE');
      }
      if (product.stock < quantity) {
        throw new CheckoutDomainError('INSUFFICIENT_STOCK');
      }

      return {
        product,
        quantity,
        priceCents: calculateSalePriceCents(product.purchaseCostCents),
      };
    },
  );

  return {
    totalCents: orderItems.reduce(
      (total, item) => total + item.priceCents * item.quantity,
      0,
    ),
    orderItems: orderItems.map(({ product, quantity, priceCents }) => ({
      productId: product.id,
      quantity,
      priceCents,
    })),
    stripeLineItems: orderItems.map(({ product, quantity, priceCents }) => ({
      price_data: {
        currency: 'mxn' as const,
        product_data: {
          name: product.name,
          description: product.description ?? `SKU: ${product.sku}`,
          images: product.imageUrl
            ? [`${process.env.APP_URL || ''}${product.imageUrl}`]
            : [],
        },
        unit_amount: priceCents,
      },
      quantity,
    })),
  };
}
