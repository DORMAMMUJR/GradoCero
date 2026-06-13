'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, Phone, ArrowLeft, Info, Package, Shield, TestTube, MapPin } from 'lucide-react';
import { formatMoney } from '@/lib/pricing';
import type { CatalogProduct } from './types';
import { ProductGrid } from './ProductGrid';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

type ProductPageViewProps = {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
  onBack: () => void;
  onAdd: (product: CatalogProduct) => void;
  onWholesale: () => void;
  onSelectRelated: (product: CatalogProduct) => void;
};

export function ProductPageView({
  product,
  relatedProducts,
  onBack,
  onAdd,
  onWholesale,
  onSelectRelated
}: ProductPageViewProps) {
  const isGradoCero = product.supplierName?.toLowerCase().includes('grado cero');
  const [currentImage, setCurrentImage] = useState(product.imageUrl || FALLBACK_IMAGE);

  useEffect(() => {
    setCurrentImage(product.imageUrl || FALLBACK_IMAGE);
  }, [product.imageUrl]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-400 transition hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Volver al catálogo <span className="text-neutral-600">/</span> {product.category} <span className="text-neutral-600">/</span> {product.sku}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Product Section */}
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px]">
          
          {/* Images Section */}
          <div className="flex gap-4 sm:gap-6 flex-col-reverse sm:flex-row">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 sm:w-20 shrink-0">
              <button 
                onClick={() => setCurrentImage(product.imageUrl || FALLBACK_IMAGE)}
                className={`relative aspect-square w-16 sm:w-full shrink-0 overflow-hidden rounded-md border-2 ${currentImage === (product.imageUrl || FALLBACK_IMAGE) ? 'border-[#F59E0B]' : 'border-white/10 opacity-50 hover:opacity-100 transition'}`}
              >
                <Image src={product.imageUrl || FALLBACK_IMAGE} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-[0.55rem] font-bold text-white uppercase tracking-widest text-center leading-tight">Ángulo<br/>1</span>
                </div>
              </button>
              <button 
                onClick={() => setCurrentImage(FALLBACK_IMAGE)}
                className={`relative aspect-square w-16 sm:w-full shrink-0 overflow-hidden rounded-md border-2 ${currentImage === FALLBACK_IMAGE ? 'border-[#F59E0B]' : 'border-white/10 opacity-50 hover:opacity-100 transition'}`}
                title="Ver imagen alternativa"
                aria-label="Ver imagen alternativa"
              >
                <Image src={FALLBACK_IMAGE} alt="" fill className="object-cover" />
              </button>
            </div>
            
            {/* Main Image */}
            <div className="relative aspect-square sm:aspect-[4/5] w-full flex-1 overflow-hidden rounded-xl border border-white/5 bg-neutral-900">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Details & Actions Section */}
          <div className="flex flex-col">
            {isGradoCero ? (
              <p className="inline-flex items-center gap-2 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#F59E0B] w-fit">
                ★ PRODUCTO OFICIAL GRADO CERO
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-neutral-300 w-fit">
                ★ PRODUCTO DE FABRICANTE ALIADO
              </p>
            )}

            <h1 className="mt-6 font-serif text-4xl font-normal leading-tight text-white sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-[#F59E0B] text-[0.7rem]">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-white/20">★</span>
              </div>
              <span className="text-[0.7rem] text-neutral-500">4.98 (185 reseñas corporativas)</span>
            </div>

            <div className="mt-8 rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl shadow-black/40">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                PRECIO OFICIAL DE SUMINISTRO
              </p>
              <p className="mt-3 font-sans text-5xl font-semibold text-white flex items-baseline gap-2">
                {formatMoney(product.salePriceCents)}
                <span className="text-[0.65rem] font-bold text-neutral-500 uppercase tracking-widest">MXN / NETO</span>
              </p>
              <p className="mt-4 flex items-center gap-2 text-[0.7rem] font-bold tracking-wide text-[#10B981]">
                <Check aria-hidden="true" className="size-4" />
                Disponible para envío inmediato + Envío express gratuito
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">
                DESCRIPCIÓN
              </h3>
              <p className="mt-4 text-[0.85rem] leading-relaxed text-neutral-400 font-light">
                {product.description ||
                  `Nuestra fórmula estrella Grado Cero para la industria alimentaria y hotelera. Desinfectante biodegradable con estabilidad termo-molecular prolongada, diseñado para erradicar patógenos en segundos. Su base activa purificada de primera generación actúa rompiendo instantáneamente membranas lipídicas, garantizando inocuidad quirúrgica sin dejar fragancias residuales molestas ni manchas químicas.`}
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <a
                href={`https://wa.me/525611614074?text=Me%20interesa%20el%20producto%20${product.sku}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#10B981] px-5 py-4 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[#0a0a0a] transition hover:bg-[#059669] shadow-lg shadow-[#10B981]/10"
              >
                <Phone className="size-4" />
                COMPRAR POR WHATSAPP
              </a>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={product.stock < 1}
                  onClick={() => onAdd(product)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-[#111111] px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  AÑADIR AL CARRITO
                </button>
                <button
                  type="button"
                  onClick={onWholesale}
                  className="inline-flex w-full items-center justify-center gap-2 rounded border border-[#F59E0B]/30 bg-[#111111] px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#F59E0B] transition hover:bg-[#F59E0B]/10 shadow-lg shadow-[#F59E0B]/5"
                >
                  OPCIÓN MAYOREO
                </button>
              </div>
              <p className="mt-4 text-center text-[0.6rem] leading-relaxed text-neutral-500 font-light max-w-sm mx-auto">
                ¿Requieres embalaje personalizado, mayoreo para licitaciones o amenidades hoteleras? Conversa de inmediato con nuestro especialista de suministro o solicita presupuesto.
              </p>
            </div>
          </div>
        </div>

        {/* Ficha Técnica Section */}
        <div className="mt-32 rounded-2xl border border-white/5 bg-[#111] overflow-hidden">
          <div className="border-b border-white/5 bg-[#0a0a0a] px-8 py-6 flex items-center gap-3">
            <Info className="size-5 text-[#F59E0B]" />
            <h3 className="font-serif text-xl text-white">Ficha Técnica y Composición Química</h3>
          </div>
          
          <div className="divide-y divide-white/5">
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] px-8 py-6 gap-4 items-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                <Package className="size-4" /> Presentación
              </span>
              <span className="text-sm text-neutral-300">Bidón de 20 Litros (Polietileno de Alta Densidad)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] px-8 py-6 gap-4 items-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                <TestTube className="size-4" /> Componente Activo
              </span>
              <span className="text-sm text-neutral-300">Fórmula activa de pureza certificada Grado Cero</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] px-8 py-6 gap-4 items-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                <TestTube className="size-4" /> Rendimiento Sugerido
              </span>
              <span className="text-sm text-neutral-300">Dilución de hasta 1:100 en agua purificada</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] px-8 py-6 gap-4 items-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                <Shield className="size-4" /> Certificados
              </span>
              <span className="text-sm text-neutral-300">Grado Alimenticio, Registro Cofepris y FDA</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] px-8 py-6 gap-4 items-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                <MapPin className="size-4" /> Origen
              </span>
              <span className="text-sm text-neutral-300">Producido bajo estándares ISO 9001 en Territorio Nacional</span>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h3 className="mb-10 font-serif text-3xl text-white">Quienes exploraron esta pieza también adquirieron</h3>
            <ProductGrid
              products={relatedProducts}
              onAdd={onAdd}
              onSelect={(p) => {
                onSelectRelated(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
