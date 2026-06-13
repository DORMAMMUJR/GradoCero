'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { formatMoney } from '@/lib/pricing';
import type { CartLine } from './types';

type CartDrawerProps = {
  open: boolean;
  lines: CartLine[];
  onOpenChange: (open: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
};

export function CartDrawer({
  open,
  lines,
  onOpenChange,
  onQuantityChange,
}: CartDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const totalCents = lines.reduce(
    (total, line) => total + line.product.salePriceCents * line.quantity,
    0,
  );

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
          })),
          customer: { name, email },
        }),
      });
      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || 'CHECKOUT_FAILED');
      }

      window.location.assign(payload.url);
    } catch {
      setError(
        'No fue posible iniciar el pago. Revisa los datos e intenta de nuevo.',
      );
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-white/10 bg-neutral-950 p-5 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-white">
                Carrito
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-neutral-400">
                Precios validados en servidor antes del pago.
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Cerrar carrito">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>

          <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
            {lines.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-neutral-500">
                Tu carrito está vacío.
              </div>
            ) : (
              lines.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {formatMoney(product.salePriceCents)} c/u
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onQuantityChange(product.id, 0)}
                      className="icon-button"
                      aria-label={`Eliminar ${product.name}`}
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onQuantityChange(product.id, quantity - 1)
                        }
                        className="icon-button"
                        aria-label={`Reducir cantidad de ${product.name}`}
                      >
                        <Minus aria-hidden="true" className="size-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        disabled={quantity >= product.stock}
                        onClick={() =>
                          onQuantityChange(product.id, quantity + 1)
                        }
                        className="icon-button"
                        aria-label={`Aumentar cantidad de ${product.name}`}
                      >
                        <Plus aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-white">
                      {formatMoney(product.salePriceCents * quantity)}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>

          <form onSubmit={handleCheckout} className="mt-6 space-y-3 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between text-lg">
              <span className="text-neutral-400">Total</span>
              <strong className="text-white">{formatMoney(totalCents)}</strong>
            </div>
            <label className="block">
              <span className="sr-only">Nombre completo</span>
              <input
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="field-control"
                placeholder="Nombre completo"
              />
            </label>
            <label className="block">
              <span className="sr-only">Correo electrónico</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field-control"
                placeholder="Correo corporativo"
              />
            </label>
            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={lines.length === 0 || submitting}
              className="primary-button w-full justify-center py-3"
            >
              <ShoppingCart aria-hidden="true" className="size-5" />
              {submitting ? 'Conectando con Stripe…' : 'Pagar con Stripe'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
