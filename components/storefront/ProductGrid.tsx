import Image from 'next/image';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { formatMoney } from '@/lib/pricing';
import type { CatalogProduct } from './types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80';

type ProductGridProps = {
  products: CatalogProduct[];
  onAdd: (product: CatalogProduct) => void;
  onSelect: (product: CatalogProduct) => void;
};

export function ProductGrid({
  products,
  onAdd,
  onSelect,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.025] p-12 text-center backdrop-blur-md">
        <h2 className="font-display text-2xl font-semibold text-white">
          Sin resultados disponibles
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Ajusta la búsqueda o selecciona otra categoría.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Productos"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {products.map((product) => (
        <article
          key={product.id}
          className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/5 bg-neutral-900/50 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-[0_24px_70px_rgba(245,158,11,0.12)]"
        >
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-900 text-left"
            aria-label={`Ver detalle de ${product.name}`}
          >
            <Image
              src={product.imageUrl || FALLBACK_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-transparent to-transparent"
            />
            {product.supplierName?.toLowerCase().includes('grado cero') ? (
              <span className="absolute left-3 top-3 border border-[#F59E0B]/30 bg-[#F59E0B]/90 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#0a0a0a] shadow-lg shadow-black/30 backdrop-blur-md">
                ★ Producto Oficial Grado Cero
              </span>
            ) : (
              <span className="absolute left-3 top-3 border border-white/20 bg-black/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-black/30 backdrop-blur-md">
                ★ Producto de Fabricante Aliado
              </span>
            )}
          </button>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-400">
                  {product.sku}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-white">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onSelect(product)}
                className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-amber-500/40 hover:text-amber-300"
                aria-label={`Abrir ${product.name}`}
              >
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-400">
              {product.description ||
                'Solución profesional para operación B2B.'}
            </p>

            <div className="mt-auto pt-6">
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs text-neutral-500">Precio de venta</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatMoney(product.salePriceCents)}
                </p>
              </div>
              <button
                type="button"
                disabled={product.stock < 1}
                onClick={() => onAdd(product)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-amber-300/30 bg-amber-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ShoppingBag aria-hidden="true" className="size-4" />
                {product.stock > 0 ? 'Comprar' : 'Agotado'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
