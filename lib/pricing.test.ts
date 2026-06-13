import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MARKUP_BASIS_POINTS,
  calculateSalePriceCents,
  formatMoney,
} from './pricing';

describe('pricing', () => {
  it('applies the standard 30 percent markup using integer cents', () => {
    expect(DEFAULT_MARKUP_BASIS_POINTS).toBe(3000);
    expect(calculateSalePriceCents(8_501)).toBe(11_051);
  });

  it('formats MXN amounts from cents', () => {
    expect(formatMoney(110_051)).toContain('1,100.51');
  });
});
