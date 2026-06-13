type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export function createRateLimiter() {
  const buckets = new Map<string, RateLimitBucket>();

  return {
    consume(key: string, limit: number, windowMs: number) {
      const now = Date.now();
      const existing = buckets.get(key);
      const bucket =
        !existing || existing.resetAt <= now
          ? { count: 0, resetAt: now + windowMs }
          : existing;

      bucket.count += 1;
      buckets.set(key, bucket);

      return {
        allowed: bucket.count <= limit,
        remaining: Math.max(0, limit - bucket.count),
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((bucket.resetAt - now) / 1000),
        ),
      };
    },
  };
}

const globalRateLimiter = createRateLimiter();

export const consumeRateLimit = globalRateLimiter.consume;
