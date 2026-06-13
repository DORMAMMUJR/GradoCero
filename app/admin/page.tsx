import { Prisma } from '@prisma/client';
import OverviewClient from './OverviewClient';
import { getPrisma } from '@/lib/prisma';

type InventoryValueRow = {
  name: string;
  value: bigint;
};

export default async function AdminOverviewPage() {
  const prisma = getPrisma();
  const [inventory, categories, statuses, totalProducts, activeQuotes] =
    await Promise.all([
      prisma.$queryRaw<Array<{ value: bigint }>>(Prisma.sql`
        SELECT COALESCE(SUM("purchaseCostCents" * stock), 0)::bigint AS value
        FROM "Product"
      `),
      prisma.$queryRaw<InventoryValueRow[]>(Prisma.sql`
        SELECT category AS name,
          COALESCE(SUM("purchaseCostCents" * stock), 0)::bigint AS value
        FROM "Product"
        GROUP BY category
        ORDER BY value DESC
        LIMIT 5
      `),
      prisma.product.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      prisma.product.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
    ]);

  const statusCounts = new Map(
    statuses.map((status) => [status.status, status._count._all]),
  );

  return (
    <OverviewClient
      stats={{
        totalInventoryValueCents: Number(inventory[0]?.value ?? 0),
        activeQuotes,
        totalProducts,
      }}
      categoryData={categories.map((category) => ({
        name: category.name,
        value: Number(category.value),
      }))}
      statusData={[
        { name: 'Activos', value: statusCounts.get('ACTIVE') ?? 0 },
        { name: 'Inactivos', value: statusCounts.get('INACTIVE') ?? 0 },
        { name: 'Borradores', value: statusCounts.get('DRAFT') ?? 0 },
      ]}
    />
  );
}
