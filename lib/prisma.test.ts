import { describe, expect, it } from 'vitest';

describe('getPrisma', () => {
  it('exports a lazy client getter instead of a module-scope client', async () => {
    const prismaModule = await import('./prisma');

    expect(prismaModule.getPrisma).toBeTypeOf('function');
    expect(prismaModule).not.toHaveProperty('default');
  });
});
