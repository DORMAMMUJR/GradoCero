import { describe, expect, it } from 'vitest';
import { hasAdminAccess } from './authorization';

describe('hasAdminAccess', () => {
  it('allows only authenticated ADMIN users', () => {
    expect(hasAdminAccess({ user: { role: 'ADMIN' } })).toBe(true);
    expect(hasAdminAccess({ user: { role: 'STAFF' } })).toBe(false);
    expect(hasAdminAccess({ user: { role: 'CUSTOMER' } })).toBe(false);
    expect(hasAdminAccess(null)).toBe(false);
  });
});
