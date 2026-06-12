'use server';

import prisma from '@/lib/prisma';

export async function searchActiveProducts(query: string) {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        sku: true,
        name: true,
        description: true,
        category: true,
        imageUrl: true,
        stock: true,
        purchaseCost: true
      },
      take: 20,
    });

    return products.map((product: any) => {
      const finalSalePrice = product.purchaseCost * 1.30;
      
      return {
        id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        stock: product.stock,
        finalSalePrice,
      };
    });
  } catch (err) {
    console.error("DB Error:", err);
    return [];
  }
}
