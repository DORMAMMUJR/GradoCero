'use client';

import { ShieldCheck, ShoppingCart, Sparkles, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AuthDialog } from '@/components/storefront/AuthDialog';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { CatalogFilters } from '@/components/storefront/CatalogFilters';
import { ProductDetail } from '@/components/storefront/ProductDetail';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import type {
  CartLine,
  CatalogProduct,
} from '@/components/storefront/types';
import { WholesaleDialog } from '@/components/storefront/WholesaleDialog';
import { filterCatalogProducts } from '@/lib/catalog/filter-products';

export default function InicioClient({
  products,
}: {
  products: CatalogProduct[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [wholesaleOpen, setWholesaleOpen] = useState(false);
  const categories = useMemo(
    () => ['Todos', ...new Set(products.map((product) => product.category))],
    [products],
  );
  const filteredProducts = useMemo(
    () => filterCatalogProducts(products, query, category),
    [category, products, query],
  );
  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => {
          const product = products.find((item) => item.id === id);
          return product ? { product, quantity } : null;
        })
        .filter((line): line is CartLine => Boolean(line)),
    [cart, products],
  );
  const cartCount = lines.reduce((total, line) => total + line.quantity, 0);

  function addProduct(product: CatalogProduct) {
    setCart((current) => ({
      ...current,
      [product.id]: Math.min((current[product.id] ?? 0) + 1, product.stock),
    }));
    setCartOpen(true);
  }

  function changeQuantity(productId: string, quantity: number) {
    setCart((current) => {
      if (quantity < 1) {
        const next = { ...current };
        delete next[productId];
        return next;
      }

      return { ...current, [productId]: quantity };
    });
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#catalogo" className="text-lg font-semibold tracking-[0.18em]">
            GRADO <span className="text-amber-400">CERO</span>
          </a>
          <nav aria-label="Acciones principales" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWholesaleOpen(true)}
              className="secondary-button hidden sm:inline-flex"
            >
              Mayoreo
            </button>
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="icon-button"
              aria-label="Acceso de cuenta"
            >
              <UserRound aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative icon-button"
              aria-label={`Abrir carrito con ${cartCount} productos`}
            >
              <ShoppingCart aria-hidden="true" className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-xs font-bold text-neutral-950">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400">
              <Sparkles aria-hidden="true" className="size-4" />
              Abastecimiento industrial
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Higiene profesional para operaciones que no pueden detenerse.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Catálogo B2B, precios calculados en servidor y pagos protegidos
              con Stripe.
            </p>
          </div>
          <div className="glass-panel self-end p-6">
            <ShieldCheck aria-hidden="true" className="size-8 text-amber-400" />
            <h2 className="mt-5 text-xl font-semibold text-white">
              Compra con integridad operativa
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Inventario, estado y precio se verifican de nuevo antes de crear
              cada orden.
            </p>
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
              Catálogo activo
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Soluciones disponibles
            </h2>
          </div>
          <p aria-live="polite" className="text-sm text-neutral-500">
            {filteredProducts.length} productos
          </p>
        </div>
        <CatalogFilters
          categories={categories}
          category={category}
          query={query}
          onCategoryChange={setCategory}
          onQueryChange={setQuery}
        />
        <div className="mt-7">
          <ProductGrid
            products={filteredProducts}
            onAdd={addProduct}
            onSelect={setSelected}
          />
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Grado Cero. Operación B2B en México.
      </footer>

      <ProductDetail product={selected} onClose={() => setSelected(null)} onAdd={addProduct} />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        onOpenChange={setCartOpen}
        onQuantityChange={changeQuantity}
      />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <WholesaleDialog open={wholesaleOpen} onOpenChange={setWholesaleOpen} />
    </main>
  );
}
