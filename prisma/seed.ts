import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Proveedores del catálogo Excel ───
const SUPPLIERS = [
  { name: 'Nacional de Aseo', email: 'contacto@nacionaldeaseo.mx' },
  { name: 'Rigasa / Nacional de Aseo', email: 'ventas@rigasa.mx' },
  { name: 'Genéricos de Limpieza', email: 'info@genericosdelimpieza.mx' },
  { name: 'Bodega de Papel', email: 'ventas@bodegadepapel.mx' },
  { name: 'Ambiderm / TatooMex', email: 'ventas@ambiderm.mx' },
  { name: 'Ambiderm', email: 'contacto@ambiderm.mx' },
  { name: 'Mr Quimi Central', email: 'ventas@mrquimi.mx' },
  { name: 'Químicos y Esencias', email: 'contacto@quimicosyesencias.mx' },
  { name: 'Química Danylus', email: 'ventas@quimicadanylus.mx' },
  { name: 'Riz Limpieza', email: 'info@rizlimpieza.mx' },
  { name: 'Marketb2b', email: 'ventas@marketb2b.mx' },
  { name: 'Rigasa Limpieza', email: 'contacto@rigasalimpieza.mx' },
];

// ─── Catálogo maestro (del Excel) ───
// purchaseCostCents = Costo Mayoreo en centavos (lo que TÚ pagas)
// Las imágenes siguen el patrón: /products/SKU-1.jpg, SKU-2.jpg, etc.
const PRODUCTS = [
  // ── Papel y Consumibles ──
  {
    sku: 'PAP-001',
    category: 'Papel y Consumibles',
    name: 'Papel Higiénico Industrial',
    description: 'Caja c/ 6 rollos de 500m, hoja doble',
    supplier: 'Nacional de Aseo',
    purchaseCostCents: 28500,
    images: ['/products/PAP-001-1.jpg', '/products/PAP-001-2.jpg', '/products/PAP-001-3.jpg'],
  },
  {
    sku: 'PAP-002',
    category: 'Papel y Consumibles',
    name: 'Toallas de Papel Interdobladas',
    description: 'Caja Sanitas, 2000 piezas',
    supplier: 'Rigasa / Nacional de Aseo',
    purchaseCostCents: 19000,
    images: ['/products/PAP-002-1.jpg', '/products/PAP-002-2.jpg'],
  },
  {
    sku: 'PAP-003',
    category: 'Papel y Consumibles',
    name: 'Papel Absorbente Industrial',
    description: 'Bobina azul limpieza pesada 300m',
    supplier: 'Genéricos de Limpieza',
    purchaseCostCents: 35000,
    images: ['/products/PAP-003-1.jpg', '/products/PAP-003-2.jpg', '/products/PAP-003-3.jpg'],
  },
  {
    sku: 'PAP-004',
    category: 'Papel y Consumibles',
    name: 'Dispensador Papel Higiénico',
    description: 'Jumbo Oval Humo',
    supplier: 'Bodega de Papel',
    purchaseCostCents: 34500,
    images: ['/products/PAP-004-1.jpg', '/products/PAP-004-2.jpg', '/products/PAP-004-3.jpg'],
  },

  // ── Protección Personal ──
  {
    sku: 'PRO-001',
    category: 'Protección Personal',
    name: 'Guantes de Nitrilo (Caja 100)',
    description: 'Caja c/100 pzas, varios colores (Negro/Azul)',
    supplier: 'Ambiderm / TatooMex',
    purchaseCostCents: 20200,
    images: ['/products/PRO-001-1.jpg', '/products/PRO-001-2.jpg', '/products/PRO-001-3.jpg'],
  },
  {
    sku: 'PRO-002',
    category: 'Protección Personal',
    name: 'Guantes de Látex (Caja 100)',
    description: 'Caja c/100 pzas, texturizados',
    supplier: 'Ambiderm',
    purchaseCostCents: 24000,
    images: ['/products/PRO-002-1.jpg', '/products/PRO-002-2.jpg', '/products/PRO-002-3.jpg'],
  },

  // ── Limpieza y Desinfección ──
  {
    sku: 'QUI-001',
    category: 'Limpieza y Desinfección',
    name: 'Desinfectante Alimenticio',
    description: 'Cloruro de Benzalconio, Bidón 20 L',
    supplier: 'Mr Quimi Central',
    purchaseCostCents: 64600,
    images: ['/products/QUI-001-1.jpg', '/products/QUI-001-2.jpg'],
  },
  {
    sku: 'QUI-002',
    category: 'Limpieza y Desinfección',
    name: 'Desinfectante Industrial',
    description: 'Amonio cuaternario Bidón 20 L',
    supplier: 'Químicos y Esencias',
    purchaseCostCents: 50000,
    images: ['/products/QUI-002-1.jpg'],
  },
  {
    sku: 'QUI-003',
    category: 'Limpieza y Desinfección',
    name: 'Detergente Industrial Multiusos',
    description: 'Detercon 20 L (Envase a cambio)',
    supplier: 'Química Danylus',
    purchaseCostCents: 28000,
    images: ['/products/QUI-003-1.jpg'],
  },
  {
    sku: 'QUI-004',
    category: 'Limpieza y Desinfección',
    name: 'Desengrasante Industrial',
    description: 'Concentrado Alcalino 20 L',
    supplier: 'Riz Limpieza',
    purchaseCostCents: 60800,
    images: ['/products/QUI-004-1.jpg'],
  },
  {
    sku: 'QUI-005',
    category: 'Limpieza y Desinfección',
    name: 'Cloro Industrial 6%',
    description: 'Hipoclorito Bidón 20 L',
    supplier: 'Química Danylus',
    purchaseCostCents: 14000,
    images: ['/products/QUI-005-1.jpg'],
  },
  {
    sku: 'QUI-006',
    category: 'Limpieza y Desinfección',
    name: 'Limpiavidrios Concentrado',
    description: 'Bidón 20 Litros',
    supplier: 'Genéricos de Limpieza',
    purchaseCostCents: 22000,
    images: ['/products/QUI-006-1.jpg'],
  },
  {
    sku: 'QUI-007',
    category: 'Limpieza y Desinfección',
    name: 'Sanitizante Frutas y Verduras',
    description: 'Bidón 5 Litros, grado alimenticio',
    supplier: 'Químicos y Esencias',
    purchaseCostCents: 18000,
    images: ['/products/QUI-007-1.jpg'],
  },
  {
    sku: 'QUI-008',
    category: 'Limpieza y Desinfección',
    name: 'Shampoo para Alfombras',
    description: 'Bidón 20 Litros, inyección succión',
    supplier: 'Marketb2b',
    purchaseCostCents: 48000,
    images: ['/products/QUI-008-1.jpg'],
  },

  // ── Baños e Higiene ──
  {
    sku: 'BAN-001',
    category: 'Baños e Higiene',
    name: 'Pastillas para Inodoro',
    description: 'Caja 50 pzas desodorante',
    supplier: 'Genéricos de Limpieza',
    purchaseCostCents: 15000,
    images: ['/products/BAN-001-1.jpg'],
  },
  {
    sku: 'BAN-002',
    category: 'Baños e Higiene',
    name: 'Aromatizante Ambiental',
    description: 'Bidón 20 L varios aromas',
    supplier: 'Química Danylus',
    purchaseCostCents: 20000,
    images: ['/products/BAN-002-1.jpg'],
  },
  {
    sku: 'BAN-003',
    category: 'Baños e Higiene',
    name: 'Jabón para Manos Industrial',
    description: 'Bidón 20 L perlescente',
    supplier: 'Marketb2b',
    purchaseCostCents: 38000,
    images: ['/products/BAN-003-1.jpg'],
  },
  {
    sku: 'BAN-004',
    category: 'Baños e Higiene',
    name: 'Gel Antibacterial 70%',
    description: 'Porrón 20 Litros',
    supplier: 'Marketb2b',
    purchaseCostCents: 45000,
    images: ['/products/BAN-004-1.jpg'],
  },

  // ── Jarciería y Generales ──
  {
    sku: 'JAR-001',
    category: 'Jarciería y Generales',
    name: 'Bolsas de Basura Industriales',
    description: 'Rollo 100 pzas, calibre grueso, Negra',
    supplier: 'Rigasa Limpieza',
    purchaseCostCents: 25000,
    images: ['/products/JAR-001-1.jpg'],
  },
  {
    sku: 'JAR-002',
    category: 'Jarciería y Generales',
    name: 'Cepillo Industrial',
    description: 'Cepillo cerdas duras p/ piso',
    supplier: 'Genéricos de Limpieza',
    purchaseCostCents: 8500,
    images: ['/products/JAR-002-1.jpg'],
  },
  {
    sku: 'JAR-003',
    category: 'Jarciería y Generales',
    name: 'Jalador de Piso',
    description: 'Jalador metálico 60cm con goma',
    supplier: 'Rigasa Limpieza',
    purchaseCostCents: 11000,
    images: ['/products/JAR-003-1.jpg'],
  },
  {
    sku: 'JAR-004',
    category: 'Jarciería y Generales',
    name: 'Trapeador Industrial',
    description: 'Pabilo de algodón 500g',
    supplier: 'Genéricos de Limpieza',
    purchaseCostCents: 4500,
    images: ['/products/JAR-004-1.jpg'],
  },
  {
    sku: 'JAR-005',
    category: 'Jarciería y Generales',
    name: 'Fibra Verde/Negra',
    description: 'Paquete con 12 fibras abrasivas',
    supplier: 'Rigasa Limpieza',
    purchaseCostCents: 12000,
    images: ['/products/JAR-005-1.jpg'],
  },
  {
    sku: 'JAR-006',
    category: 'Jarciería y Generales',
    name: 'Esponjas Multiusos',
    description: 'Paquete 24 esponjas doble cara',
    supplier: 'Rigasa Limpieza',
    purchaseCostCents: 9500,
    images: ['/products/JAR-006-1.jpg'],
  },
];

async function main() {
  console.log('🌱 Sembrando base de datos...\n');

  // 1. Crear proveedores (upsert para que sea idempotente)
  const supplierMap = new Map<string, string>();

  for (const sup of SUPPLIERS) {
    const record = await prisma.supplier.upsert({
      where: { id: sup.name }, // usamos upsert por nombre
      update: {},
      create: {
        name: sup.name,
        email: sup.email,
      },
    });
    supplierMap.set(sup.name, record.id);
    console.log(`  ✅ Proveedor: ${sup.name}`);
  }

  console.log(`\n📦 Insertando ${PRODUCTS.length} productos...\n`);

  // 2. Crear productos (upsert por SKU para que sea idempotente)
  for (const prod of PRODUCTS) {
    const supplierId = supplierMap.get(prod.supplier);
    if (!supplierId) {
      console.error(`  ❌ Proveedor no encontrado para ${prod.sku}: ${prod.supplier}`);
      continue;
    }

    await prisma.product.upsert({
      where: { sku: prod.sku },
      update: {
        name: prod.name,
        description: prod.description,
        category: prod.category,
        purchaseCostCents: prod.purchaseCostCents,
        imageUrl: prod.images[0], // imagen principal
        status: 'ACTIVE',
        supplierId,
      },
      create: {
        sku: prod.sku,
        name: prod.name,
        description: prod.description,
        category: prod.category,
        purchaseCostCents: prod.purchaseCostCents,
        imageUrl: prod.images[0],
        stock: 100, // stock inicial
        status: 'ACTIVE',
        supplierId,
      },
    });

    console.log(`  ✅ [${prod.sku}] ${prod.name} — $${(prod.purchaseCostCents / 100).toFixed(2)} MXN`);
  }

  console.log('\n🎉 ¡Siembra completa! 26 productos listos en tu base de datos.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la siembra:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
