import { describe, expect, it } from 'vitest';
import { checkoutSchema } from './checkout';

describe('checkoutSchema', () => {
  const validPayload = {
    items: [{ productId: 'cm12345678901234567890123', quantity: 2 }],
    customer: { email: 'compras@empresa.mx', name: 'Compras Empresa' },
  };

  it('accepts a strict valid checkout payload', () => {
    expect(checkoutSchema.parse(validPayload)).toEqual(validPayload);
  });

  it('rejects non-positive quantities', () => {
    expect(() =>
      checkoutSchema.parse({
        ...validPayload,
        items: [{ ...validPayload.items[0], quantity: -1 }],
      }),
    ).toThrow();
  });

  it('rejects unknown top-level fields', () => {
    expect(() =>
      checkoutSchema.parse({ ...validPayload, trustedTotal: 1 }),
    ).toThrow();
  });
});
