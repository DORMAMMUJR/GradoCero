'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { Boxes, Check, ShoppingBag, X, Phone } from 'lucide-react';
import { formatMoney } from '@/lib/pricing';
import type { CatalogProduct } from './types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

type ProductDetailProps = {
  product: CatalogProduct | null;
  onClose: () => void;
  onAdd: (product: CatalogProduct) => void;
  onWholesale: () => void;
};

export function ProductDetail({
  product,
  onClose,
  onAdd,
  onWholesale,
}: ProductDetailProps) {
  return (
    <Dialog.Root
      open={Boolean(product)}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay bg-black/80 backdrop-blur-md" />
        <Dialog.Content className="dialog-content product-dialog max-w-6xl overflow-hidden rounded-2xl p-0 shadow-[0_32px_120px_rgba(0,0,0,0.8)]">
          {product && (
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(23rem,0.95fr)]">
              <div className="flex bg-[#0a0a0a] min-h-72 sm:min-h-[26rem] lg:min-h-[38rem] p-6 lg:p-8 gap-4">
                <div className="hidden sm:flex flex-col gap-3 w-16 shrink-0">
                  <div className="relative aspect-square rounded-md overflow-hidden border-2 border-[#F59E0B]">
                    <Image src={product.imageUrl || FALLBACK_IMAGE} alt="" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-square rounded-md overflow-hidden border border-white/10 opacity-50">
                    <Image src={product.imageUrl || FALLBACK_IMAGE} alt="" fill className="object-cover" />
                  </div>
                </div>
                <div className="relative flex-1 rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                  <Image
                    src={product.imageUrl || FALLBACK_IMAGE}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-col p-6 sm:p-9 lg:p-10 bg-[#0a0a0a]">
                <Dialog.Close
                  className="ml-auto flex size-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.03] text-neutral-400 transition hover:border-[#F59E0B]/40 hover:text-[#F59E0B]"
                  aria-label="Cerrar"
                >
                  <X aria-hidden="true" className="size-5" />
                </Dialog.Close>

                {product.supplierName?.toLowerCase().includes('grado cero') ? (
                  <p className="mt-2 inline-flex items-center gap-2 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#F59E0B] w-fit">
                    ★ PRODUCTO OFICIAL GRADO CERO
                  </p>
                ) : (
                  <p className="mt-2 inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-neutral-300 w-fit">
                    ★ PRODUCTO DE FABRICANTE ALIADO
                  </p>
                )}

                <Dialog.Title className="mt-4 font-serif text-3xl font-normal leading-tight text-white sm:text-4xl">
                  {product.name}
                </Dialog.Title>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex text-[#F59E0B] text-[0.65rem]">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-white/20">★</span>
                  </div>
                  <span className="text-[0.65rem] text-neutral-500">4.98 (185 reseñas corporativas)</span>
                </div>

                <div className="mt-6 rounded-xl border border-white/5 bg-[#111111] p-5">
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    PRECIO OFICIAL DE SUMINISTRO
                  </p>
                  <p className="mt-2 font-sans text-4xl font-semibold text-white flex items-baseline gap-2">
                    {formatMoney(product.salePriceCents)}
                    <span className="text-[0.6rem] font-bold text-neutral-500 uppercase tracking-widest">MXN / NETO</span>
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-[0.65rem] font-bold tracking-wide text-[#10B981]">
                    <Check aria-hidden="true" className="size-4" />
                    Disponible para envío inmediato + Envío express gratuito
                  </p>
                </div>

                <div className="mt-7">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    DESCRIPCIÓN
                  </p>
                  <Dialog.Description className="mt-3 text-[0.8rem] leading-relaxed text-neutral-400 font-light">
                    {product.description ||
                      'Detercon original formulado bajo el estricto rigor de Grado Cero. Penetra profundamente en las superficies más complejas, desprendiendo aceites hidrofóbicos, grasas minerales y hollín de manera inmediata. Su pH equilibrado reduce drásticamente el desgaste de materiales metálicos o polímeros de instrumentación industrial.'}
                  </Dialog.Description>
                </div>

                <div className="mt-auto pt-8">
                  <a
                    href={`https://wa.me/525611614074?text=Me%20interesa%20el%20producto%20${product.sku}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#10B981] px-5 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#0a0a0a] transition hover:bg-[#059669]"
                  >
                    <Phone className="size-4" />
                    COMPRAR POR WHATSAPP
                  </a>
                  
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={product.stock < 1}
                      onClick={() => {
                        onAdd(product);
                        onClose();
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-[#111111] px-5 py-3.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      AÑADIR AL CARRITO
                    </button>
                    <button
                      type="button"
                      onClick={onWholesale}
                      className="inline-flex w-full items-center justify-center gap-2 rounded border border-[#F59E0B]/30 bg-[#111111] px-5 py-3.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#F59E0B] transition hover:bg-[#F59E0B]/10"
                    >
                      OPCIÓN MAYOREO
                    </button>
                  </div>

                  <p className="mt-6 text-center text-[0.55rem] text-neutral-500 leading-relaxed max-w-sm mx-auto">
                    ¿Requieres embalaje personalizado, mayoreo para licitaciones o amenidades hoteleras? Conversa de inmediato con nuestro especialista de suministro o solicita presupuesto.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
