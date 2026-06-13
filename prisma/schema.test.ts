import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const schema = readFileSync(new URL('./schema.prisma', import.meta.url), 'utf8');

describe('Prisma production schema', () => {
  it('stores money as integer cents and orders with a constrained enum', () => {
    expect(schema).toMatch(/purchaseCostCents\s+Int/);
    expect(schema).toMatch(/unitPriceCents\s+Int/);
    expect(schema).toMatch(/totalCents\s+Int/);
    expect(schema).toMatch(/priceCents\s+Int/);
    expect(schema).toContain('enum OrderStatus');
    expect(schema).not.toContain('purchaseCost  Float');
  });

  it('contains Auth.js and Stripe idempotency models', () => {
    expect(schema).toContain('model Account');
    expect(schema).toContain('model Session');
    expect(schema).toContain('model VerificationToken');
    expect(schema).toContain('model StripeEvent');
    expect(schema).toContain('stripeCheckoutSessionId String?');
  });
});
