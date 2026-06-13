import type { ProductStatus } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { getPrisma } from '@/lib/prisma';
import { calculateSalePriceCents, formatMoney } from '@/lib/pricing';

const PAGE_SIZE = 25;

function statusLabel(status: ProductStatus) {
  return {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
    DRAFT: 'Borrador',
  }[status];
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const parameters = await searchParams;
  const page = Math.max(1, Number.parseInt(parameters.page || '1', 10) || 1);
  const query = parameters.q?.trim() || '';
  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' as const } },
          { sku: { contains: query, mode: 'insensitive' as const } },
          { category: { contains: query, mode: 'insensitive' as const } },
        ],
      }
    : {};
  const prisma = getPrisma();
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        sku: true,
        name: true,
        category: true,
        purchaseCostCents: true,
        stock: true,
        status: true,
      },
    }),
    prisma.product.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const queryString = query ? `&q=${encodeURIComponent(query)}` : '';

  return (
    <main>
      <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
        Inventario
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Productos</h1>

      <form className="mt-7 flex max-w-xl gap-2" action="/admin/productos">
        <label className="relative block flex-1">
          <span className="sr-only">Buscar productos</span>
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
          />
          <input
            name="q"
            defaultValue={query}
            className="field-control pl-12"
            placeholder="SKU, nombre o categoría"
          />
        </label>
        <button className="primary-button" type="submit">
          Buscar
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">Producto</th>
                <th className="px-5 py-4">Categoría</th>
                <th className="px-5 py-4 text-right">Costo</th>
                <th className="px-5 py-4 text-right">Venta</th>
                <th className="px-5 py-4 text-right">Stock</th>
                <th className="px-5 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="text-neutral-300">
                  <td className="px-5 py-4 font-mono text-xs">{product.sku}</td>
                  <td className="px-5 py-4 font-medium text-white">
                    {product.name}
                  </td>
                  <td className="px-5 py-4">{product.category}</td>
                  <td className="px-5 py-4 text-right">
                    {formatMoney(product.purchaseCostCents)}
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-amber-300">
                    {formatMoney(
                      calculateSalePriceCents(product.purchaseCostCents),
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">{product.stock}</td>
                  <td className="px-5 py-4">{statusLabel(product.status)}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-500">
                    No hay productos para esta búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-neutral-500">
          <span>{total} productos</span>
          <div className="flex gap-2">
            <Link
              aria-disabled={page <= 1}
              href={`/admin/productos?page=${Math.max(1, page - 1)}${queryString}`}
              className="secondary-button aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              Anterior
            </Link>
            <Link
              aria-disabled={page >= totalPages}
              href={`/admin/productos?page=${Math.min(totalPages, page + 1)}${queryString}`}
              className="secondary-button aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
