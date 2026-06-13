import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRateLimiter } from './rate-limit';

describe('rate limiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-13T12:00:00Z'));
  });

  it('blocks requests beyond the configured limit', () => {
    const { consume } = createRateLimiter();

    expect(consume('ip-1', 2, 60_000).allowed).toBe(true);
    expect(consume('ip-1', 2, 60_000).allowed).toBe(true);
    expect(consume('ip-1', 2, 60_000).allowed).toBe(false);
  });

  it('starts a new window after expiry', () => {
    const { consume } = createRateLimiter();
    consume('ip-1', 1, 60_000);
    vi.advanceTimersByTime(60_001);

    expect(consume('ip-1', 1, 60_000).allowed).toBe(true);
  });
});
