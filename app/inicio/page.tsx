import InicioClient from './InicioClient';
import { resolveAuthProviderConfig } from '@/lib/auth/provider-config';
import { getPrisma } from '@/lib/prisma';
import { calculateSalePriceCents } from '@/lib/pricing';
import type { CatalogProduct } from '@/components/storefront/types';

export const dynamic = 'force-dynamic';

// ─── DATOS DEMO (se usan cuando no hay conexión a la BD) ─────────────────────
const DEMO_PRODUCTS: CatalogProduct[] = [
  {
    id: 'demo-001',
    sku: 'GC-DES-001',
    name: 'Desengrasante Industrial Pro',
    description: 'Desengrasante de alta eficiencia para superficies metálicas, libre de fosfatos y biodegradable. Ideal para líneas de producción.',
    category: 'Limpieza Industrial',
    imageUrl: null,
    salePriceCents: 48000,
    stock: 120,
    supplierName: 'Kärcher',
  },
  {
    id: 'demo-002',
    sku: 'GC-DES-002',
    name: 'Desinfectante Quat-5',
    description: 'Desinfectante de amplio espectro a base de amonio cuaternario de 5ta generación. Certificado para uso en industria alimentaria.',
    category: 'Limpieza Industrial',
    imageUrl: null,
    salePriceCents: 35500,
    stock: 85,
    supplierName: 'Diversey',
  },
  {
    id: 'demo-003',
    sku: 'GC-LUB-001',
    name: 'Lubricante Cadena H1',
    description: 'Lubricante grado alimenticio NSF H1 para cadenas en ambientes húmedos o de procesamiento de alimentos.',
    category: 'Lubricación',
    imageUrl: null,
    salePriceCents: 62000,
    stock: 45,
    supplierName: 'Ecolab',
  },
  {
    id: 'demo-004',
    sku: 'GC-LUB-002',
    name: 'Grasa de Alta Temperatura',
    description: 'Grasa de litio complejo para rodamientos a temperaturas de hasta 180°C. Resistente a agua y vapor.',
    category: 'Lubricación',
    imageUrl: null,
    salePriceCents: 78500,
    stock: 30,
    supplierName: 'Spartan',
  },
  {
    id: 'demo-005',
    sku: 'GC-PRO-001',
    name: 'Guantes Nitrilo Industrial',
    description: 'Guantes de nitrilo resistentes a químicos, grasas y aceites. Caja de 100 unidades talla M. Sin polvo.',
    category: 'Protección Personal',
    imageUrl: null,
    salePriceCents: 28900,
    stock: 200,
    supplierName: '3M',
  },
  {
    id: 'demo-006',
    sku: 'GC-PRO-002',
    name: 'Respirador Media Cara 3M',
    description: 'Respirador reutilizable con filtros para vapores orgánicos y partículas. Compatible con filtros serie 6000.',
    category: 'Protección Personal',
    imageUrl: null,
    salePriceCents: 115000,
    stock: 18,
    supplierName: '3M',
  },
  {
    id: 'demo-007',
    sku: 'GC-ABS-001',
    name: 'Absorbente Universal 40x50',
    description: 'Paño absorbente para derrames de aceite, agua y químicos. Rollo de 200 hojas perforadas.',
    category: 'Control de Derrames',
    imageUrl: null,
    salePriceCents: 42000,
    stock: 60,
    supplierName: 'Kärcher',
  },
  {
    id: 'demo-008',
    sku: 'GC-SIG-001',
    name: 'Kit Señalización Industrial',
    description: 'Kit de 20 señales de seguridad según NOM-003-SEGOB. Material vinílico autoadherible de alta durabilidad.',
    category: 'Seguridad',
    imageUrl: null,
    salePriceCents: 22500,
    stock: 75,
    supplierName: 'Spartan',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default async function InicioPage() {
  const authProviders = resolveAuthProviderConfig(process.env);

  let products: CatalogProduct[] = [];

  try {
    const records = await getPrisma().product.findMany({
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

    products = records.map(({ supplier, purchaseCostCents, ...product }) => ({
      ...product,
      supplierName: supplier.name,
      salePriceCents: calculateSalePriceCents(purchaseCostCents),
    }));
  } catch {
    // Sin conexión a BD → mostrar catálogo demo
    products = DEMO_PRODUCTS;
  }

  return (
    <InicioClient
      googleEnabled={authProviders.googleEnabled}
      resendEnabled={authProviders.resendEnabled}
      products={products}
    />
  );
}

