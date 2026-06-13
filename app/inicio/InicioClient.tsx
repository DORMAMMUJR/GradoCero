'use client';

import {
  ArrowDownRight,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserRound,
  Search,
  Award,
  ArrowUp,
  FileText,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Linkedin,
  Instagram,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { AuthDialog } from '@/components/storefront/AuthDialog';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { CatalogFilters } from '@/components/storefront/CatalogFilters';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { ProductPageView } from '@/components/storefront/ProductPageView';
import { ThemeToggle } from '@/components/storefront/ThemeToggle';
import type {
  CartLine,
  CatalogProduct,
} from '@/components/storefront/types';
import { WholesaleDialog } from '@/components/storefront/WholesaleDialog';
import { filterCatalogProducts } from '@/lib/catalog/filter-products';

export default function InicioClient({
  googleEnabled,
  products,
  resendEnabled,
}: {
  googleEnabled: boolean;
  products: CatalogProduct[];
  resendEnabled: boolean;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [wholesaleOpen, setWholesaleOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0E0E10]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded bg-[#F59E0B] font-serif text-sm font-bold text-[#0E0E10]">
              GC
            </div>
            <a href="#catalogo" className="flex items-baseline gap-2 text-lg font-bold tracking-[0.18em] text-white">
              GRADO CERO
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-neutral-400">
            <a href="#" className="text-white transition hover:text-white">Inicio</a>
            <a href="#" className="transition hover:text-white">Grado Cero</a>
            <a href="#catalogo" className="transition hover:text-white">Catálogo</a>
            <a href="#" className="transition hover:text-white">Marcas Aliadas</a>
            <a href="#" className="transition hover:text-white">Contacto</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition focus-within:border-white/20 focus-within:bg-white/[0.05]">
              <Search className="size-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar esencia, crema..."
                className="w-48 bg-transparent text-xs text-white placeholder-neutral-500 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center text-neutral-400 transition hover:text-white"
              aria-label={`Abrir carrito con ${cartCount} productos`}
            >
              <ShoppingCart aria-hidden="true" className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#F59E0B] text-[0.6rem] font-bold text-[#0E0E10]">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="flex items-center justify-center text-neutral-400 transition hover:text-white"
              aria-label="Acceso de cuenta"
            >
              <UserRound aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center text-neutral-400 transition hover:text-white lg:hidden ml-2"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="size-6" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 p-4 lg:hidden shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 focus-within:border-white/20 focus-within:bg-white/[0.05]">
              <Search className="size-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
              />
            </div>
            <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-neutral-400 p-2">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-amber-500 transition border-b border-white/5 pb-2">Inicio</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition border-b border-white/5 pb-2">Grado Cero</a>
              <a href="#catalogo" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition border-b border-white/5 pb-2">Catálogo</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition border-b border-white/5 pb-2">Marcas Aliadas</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition pb-2">Contacto</a>
            </nav>
          </div>
        )}
      </header>

      {selected ? (
        <ProductPageView
          product={selected}
          relatedProducts={products.filter(p => p.category === selected.category && p.id !== selected.id).slice(0, 4)}
          onBack={() => {
            setSelected(null);
            setTimeout(() => {
              const catalogEl = document.getElementById('catalogo');
              if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          onAdd={addProduct}
          onWholesale={() => setWholesaleOpen(true)}
          onSelectRelated={(p) => setSelected(p)}
        />
      ) : (
        <>
          <section className="hero-section relative isolate overflow-hidden bg-[#0a0a0a]">
        <div className="hero-glow" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(245,158,11,0.08),transparent_40%)]"
        />
        <div className="relative mx-auto flex min-h-[40rem] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl text-left">
            <p className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              <span className="text-lg">#</span> COLECCIÓN OFICIAL GRADO CERO
            </p>

            <h1 className="hero-heading mt-6 max-w-5xl font-serif text-5xl font-normal leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[5.5rem] text-white">
              Grado Cero
            </h1>

            <p className="mt-8 font-serif text-2xl italic text-neutral-300">
              &quot;Primero lo nuestro. Después, lo mejor del mercado.&quot;
            </p>

            <p className="hero-copy mt-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-neutral-400 sm:text-base">
              Suministros industriales, accesorios y productos seleccionados de fabricantes aliados para la operación diaria.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row items-center">
              <a
                href="#catalogo"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded bg-[#F59E0B] px-8 font-sans text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#0E0E10] transition hover:bg-[#D97706] sm:w-auto"
              >
                COMPRAR AHORA
                <ArrowDownRight aria-hidden="true" className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => setWholesaleOpen(true)}
                className="inline-flex h-12 w-full items-center justify-center rounded border border-white/20 bg-transparent px-8 font-sans text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white transition hover:border-[#F59E0B] hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] sm:w-auto"
              >
                VER COLECCIÓN GRADO CERO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: MARCAS ALIADAS (Pasarela) */}
      <section className="border-b border-white/5 bg-neutral-950 py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">
            Fabricantes y Aliados Estratégicos
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-50">
            <span className="text-xl sm:text-2xl font-serif text-white tracking-widest">Kärcher</span>
            <span className="text-xl sm:text-2xl font-serif text-white tracking-widest">Diversey</span>
            <span className="text-xl sm:text-2xl font-serif text-white tracking-widest">Ecolab</span>
            <span className="text-xl sm:text-2xl font-serif text-white tracking-widest">3M</span>
            <span className="text-xl sm:text-2xl font-serif text-white tracking-widest">Spartan</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUIÉNES SOMOS / DUDAS */}
      <section className="bg-[#0a0a0a] py-20 lg:py-32 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-normal text-white sm:text-5xl">El rigor detrás de la etiqueta</h2>
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              Grado Cero nace para resolver la incertidumbre en el abastecimiento B2B. Formulamos, seleccionamos y certificamos cada producto de nuestra red de aliados para garantizar la continuidad operativa de tu industria.
            </p>
          </div>
          
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-[#111] p-8 transition hover:border-[#F59E0B]/30">
              <h3 className="font-bold uppercase tracking-widest text-[0.7rem] text-[#F59E0B]">¿Qué somos?</h3>
              <p className="mt-4 text-[0.8rem] font-light leading-relaxed text-neutral-400">Somos un proveedor centralizado. Eliminamos intermediarios al conectar directamente fábricas certificadas con compradores corporativos y licitaciones.</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#111] p-8 transition hover:border-[#F59E0B]/30">
              <h3 className="font-bold uppercase tracking-widest text-[0.7rem] text-[#F59E0B]">¿Con quién contribuimos?</h3>
              <p className="mt-4 text-[0.8rem] font-light leading-relaxed text-neutral-400">Auditamos y nos aliamos con laboratorios y fábricas nacionales que cumplen el máximo rigor operativo, impulsando su alcance institucional a gran escala.</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#111] p-8 transition hover:border-[#F59E0B]/30">
              <h3 className="font-bold uppercase tracking-widest text-[0.7rem] text-[#F59E0B]">Garantía Incondicional</h3>
              <p className="mt-4 text-[0.8rem] font-light leading-relaxed text-neutral-400">Inocuidad total, fichas técnicas transparentes y disponibilidad en tiempo real. Lo que ves en el catálogo, es lo que tienes en planta mañana mismo.</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-white/10 pb-7">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
              Catálogo activo
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
              Soluciones disponibles
            </h2>
          </div>
          <p aria-live="polite" className="text-sm text-neutral-500">
            {filteredProducts.length} productos
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]">
          <CatalogFilters
            categories={categories}
            category={category}
            query={query}
            onCategoryChange={setCategory}
            onQueryChange={setQuery}
          />
          <div className="min-w-0">
            <ProductGrid
              products={filteredProducts}
              onAdd={addProduct}
              onSelect={(product) => {
                setSelected(product);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>
      </>
      )}

      <footer className="relative border-t border-white/5 bg-[#0a0a0a] pt-16 pb-8 mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#111] border border-white/10 text-neutral-400 transition hover:text-white hover:border-[#F59E0B]/50"
          aria-label="Volver arriba"
        >
          <ArrowUp className="size-4" />
        </button>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr]">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded bg-[#F59E0B] font-serif text-lg font-bold text-[#0E0E10]">
                  GC
                </div>
                <div className="flex items-baseline gap-2 text-xl font-bold tracking-[0.18em] text-white">
                  Grado Cero
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] text-[#F59E0B]">B2B</span>
                </div>
              </div>
              <p className="mt-6 text-[0.8rem] leading-relaxed text-neutral-400 max-w-sm font-light">
                Suministros y formulaciones químicas de grado industrial con eficiencia logística B2B integrada.
                Proveemos a la industria farmacéutica, manufacturera e institucional soluciones premium garantizadas.
              </p>
              
              <div className="mt-8">
                <p className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-600">
                  DISTRIBUIDOR AUTORIZADO
                </p>
                <div className="mt-3 flex items-center gap-3 text-[0.75rem] text-neutral-400">
                  <Award className="size-4 text-[#F59E0B]" />
                  Normas de Calidad Química Industrial
                </div>
              </div>
            </div>

            {/* Column 2: Catálogo */}
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-white">CATÁLOGO</h4>
              <ul className="mt-6 space-y-4 text-[0.8rem] text-neutral-400">
                <li><a href="#" className="transition hover:text-white">Inicio</a></li>
                <li><a href="#catalogo" className="transition hover:text-white">Productos</a></li>
                <li><a href="#" className="transition hover:text-white">Módulo de Carga</a></li>
              </ul>
            </div>

            {/* Column 3: Documentos Legales */}
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-white">DOCUMENTOS LEGALES</h4>
              <ul className="mt-6 space-y-4 text-[0.8rem] text-neutral-400">
                <li>
                  <a href="/legal/terminos" className="flex items-center gap-3 transition hover:text-white">
                    <FileText className="size-4 text-neutral-500" />
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="/legal/privacidad" className="flex items-center gap-3 transition hover:text-white">
                    <ShieldCheck className="size-4 text-neutral-500" />
                    Aviso de Privacidad
                  </a>
                </li>
                <li>
                  <a href="/legal/privacidad#contacto" className="flex items-center gap-3 transition hover:text-white">
                    <BookOpen className="size-4 text-neutral-500" />
                    Cumplimiento Legal
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Soporte Técnico */}
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-white">SOPORTE TÉCNICO CORPORATIVO</h4>
              <ul className="mt-6 space-y-4 text-[0.8rem] text-neutral-400">
                <li className="flex items-start gap-3">
                  <MapPin className="size-4 mt-0.5 shrink-0 text-[#F59E0B]" />
                  <span className="leading-relaxed">Paseo de la Reforma 250, Juárez,<br/>06600 Ciudad de México, CDMX,<br/>México</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-[#F59E0B]" />
                  <span>info@gradocero.mx</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-[#F59E0B]" />
                  <span>+52 55 5555 5555</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="size-4 shrink-0 text-[#F59E0B]" />
                  <span>Atención 24/7 para Clientes Activos</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
            <div className="text-[0.65rem] text-neutral-500 text-center sm:text-left">
              <p>© {new Date().getFullYear()} Grado Cero B2B S.A. de C.V. Todos los derechos reservados.</p>
              <p className="mt-1">Las marcas comerciales y logotipos industriales citados son propiedad de sus respectivos dueños. Fabricación garantizada.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" title="Facebook" aria-label="Facebook" className="flex size-8 items-center justify-center rounded-full bg-[#111] text-neutral-400 transition hover:bg-white/10 hover:text-white">
                <Facebook className="size-3.5" />
              </a>
              <a href="#" title="LinkedIn" aria-label="LinkedIn" className="flex size-8 items-center justify-center rounded-full bg-[#111] text-neutral-400 transition hover:bg-white/10 hover:text-white">
                <Linkedin className="size-3.5" />
              </a>
              <a href="#" title="Instagram" aria-label="Instagram" className="flex size-8 items-center justify-center rounded-full bg-[#111] text-neutral-400 transition hover:bg-white/10 hover:text-white">
                <Instagram className="size-3.5" />
              </a>
              <a href="#" className="flex items-center gap-2 rounded-full bg-[#111] px-4 py-1.5 text-[0.65rem] font-medium text-neutral-400 transition hover:bg-white/10 hover:text-white">
                <Globe className="size-3.5" />
                gradocero.mx
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/525611614074"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-110"
          title="Contactar por WhatsApp"
          aria-label="Contactar por WhatsApp"
        >
          <Phone className="size-6" fill="currentColor" />
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[0.6rem] font-bold text-white border-2 border-[#0a0a0a]">
            1
          </span>
        </a>
      </footer>

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onOpenChange={setCartOpen}
        onQuantityChange={changeQuantity}
      />
      <AuthDialog
        googleEnabled={googleEnabled}
        open={authOpen}
        resendEnabled={resendEnabled}
        onOpenChange={setAuthOpen}
      />
      <WholesaleDialog
        open={wholesaleOpen}
        onOpenChange={setWholesaleOpen}
      />
    </main>
  );
}
