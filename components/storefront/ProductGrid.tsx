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
      <div className="glass-panel p-12 text-center">
        <h2 className="text-xl font-semibold text-white">
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
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70 shadow-2xl shadow-black/20"
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
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-neutral-200 backdrop-blur">
              {product.supplierName}
            </span>
          </button>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-amber-400">
                  {product.sku}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-white">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onSelect(product)}
                className="icon-button"
                aria-label={`Abrir ${product.name}`}
              >
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-400">
              {product.description || 'Solución profesional para operación B2B.'}
            </p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-neutral-500">Precio de venta</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  {formatMoney(product.salePriceCents)}
                </p>
              </div>
              <button
                type="button"
                disabled={product.stock < 1}
                onClick={() => onAdd(product)}
                className="primary-button px-4 py-2.5"
              >
                <ShoppingBag aria-hidden="true" className="size-4" />
                {product.stock > 0 ? 'Agregar' : 'Agotado'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
