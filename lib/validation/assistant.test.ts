import { describe, expect, it } from 'vitest';
import { assistantRequestSchema } from './assistant';

describe('assistantRequestSchema', () => {
  it('rejects empty and oversized prompts', () => {
    expect(
      assistantRequestSchema.safeParse({ prompt: '', feature: 'guide' }).success,
    ).toBe(false);
    expect(
      assistantRequestSchema.safeParse({
        prompt: 'a'.repeat(2001),
        feature: 'guide',
      }).success,
    ).toBe(false);
  });

  it('rejects unsupported features and unknown properties', () => {
    expect(
      assistantRequestSchema.safeParse({
        prompt: 'Hola',
        feature: 'code',
      }).success,
    ).toBe(false);
    expect(
      assistantRequestSchema.safeParse({
        prompt: 'Hola',
        feature: 'guide',
        admin: true,
      }).success,
    ).toBe(false);
  });
});
