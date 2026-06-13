import { PrismaClient } from '@prisma/client';

declare global {
  var gradoCeroPrisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  if (!globalThis.gradoCeroPrisma) {
    globalThis.gradoCeroPrisma = new PrismaClient();
  }

  return globalThis.gradoCeroPrisma;
}
