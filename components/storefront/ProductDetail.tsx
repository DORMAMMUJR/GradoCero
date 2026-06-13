'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ShoppingBag, X } from 'lucide-react';
import { formatMoney } from '@/lib/pricing';
import type { CatalogProduct } from './types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

type ProductDetailProps = {
  product: CatalogProduct | null;
  onClose: () => void;
  onAdd: (product: CatalogProduct) => void;
};

export function ProductDetail({
  product,
  onClose,
  onAdd,
}: ProductDetailProps) {
  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content max-w-4xl overflow-hidden p-0">
          {product && (
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-72 bg-neutral-900 md:min-h-[34rem]">
                <Image
                  src={product.imageUrl || FALLBACK_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <Dialog.Close className="icon-button ml-auto" aria-label="Cerrar">
                  <X aria-hidden="true" className="size-5" />
                </Dialog.Close>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-amber-400">
                  {product.category} · {product.sku}
                </p>
                <Dialog.Title className="mt-3 text-3xl font-semibold text-white">
                  {product.name}
                </Dialog.Title>
                <Dialog.Description className="mt-5 text-sm leading-7 text-neutral-300">
                  {product.description ||
                    'Producto profesional disponible para operación B2B.'}
                </Dialog.Description>
                <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-5 text-sm">
                  <div>
                    <dt className="text-neutral-500">Proveedor</dt>
                    <dd className="mt-1 text-white">{product.supplierName}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500">Existencia</dt>
                    <dd className="mt-1 text-white">{product.stock} unidades</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-8">
                  <p className="text-3xl font-semibold text-white">
                    {formatMoney(product.salePriceCents)}
                  </p>
                  <button
                    type="button"
                    disabled={product.stock < 1}
                    onClick={() => {
                      onAdd(product);
                      onClose();
                    }}
                    className="primary-button mt-5 w-full justify-center py-3"
                  >
                    <ShoppingBag aria-hidden="true" className="size-5" />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
