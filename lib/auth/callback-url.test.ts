import { describe, expect, it } from 'vitest';
import { getSafeCallbackUrl } from './callback-url';

describe('getSafeCallbackUrl', () => {
  it('accepts only local absolute paths', () => {
    expect(getSafeCallbackUrl('/admin/productos')).toBe('/admin/productos');
    expect(getSafeCallbackUrl('https://example.com')).toBe('/admin');
    expect(getSafeCallbackUrl('//example.com')).toBe('/admin');
    expect(getSafeCallbackUrl(undefined)).toBe('/admin');
  });
});
