'use server';

import { auth } from '@/auth';
import { hasAdminAccess } from '@/lib/auth/authorization';
import { getPrisma } from '@/lib/prisma';
import { calculateSalePriceCents } from '@/lib/pricing';

export async function searchActiveProducts(query: string) {
  const session = await auth();
  if (!hasAdminAccess(session)) {
    throw new Error('UNAUTHORIZED');
  }

  const normalizedQuery = query.trim().slice(0, 120);
  if (!normalizedQuery) {
    return [];
  }

  const products = await getPrisma().product.findMany({
    where: {
      status: 'ACTIVE',
      OR: [
        { name: { contains: normalizedQuery, mode: 'insensitive' } },
        { sku: { contains: normalizedQuery, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      sku: true,
      name: true,
      description: true,
      category: true,
      imageUrl: true,
      stock: true,
      purchaseCostCents: true,
    },
    take: 20,
  });

  return products.map(({ purchaseCostCents, ...product }) => ({
    ...product,
    salePriceCents: calculateSalePriceCents(purchaseCostCents),
  }));
}
