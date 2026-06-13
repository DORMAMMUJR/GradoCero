import InicioClient from './InicioClient';
import { resolveAuthProviderConfig } from '@/lib/auth/provider-config';
import { getPrisma } from '@/lib/prisma';
import { calculateSalePriceCents } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

export default async function InicioPage() {
  const authProviders = resolveAuthProviderConfig(process.env);
  const products = await getPrisma().product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      sku: true,
      name: true,
      description: true,
      category: true,
      imageUrl: true,
      purchaseCostCents: true,
      stock: true,
      supplier: { select: { name: true } },
    },
  });

  return (
    <InicioClient
      googleEnabled={authProviders.googleEnabled}
      resendEnabled={authProviders.resendEnabled}
      products={products.map(({ supplier, purchaseCostCents, ...product }) => ({
        ...product,
        supplierName: supplier.name,
        salePriceCents: calculateSalePriceCents(purchaseCostCents),
      }))}
    />
  );
}
