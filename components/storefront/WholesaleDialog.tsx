'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Mail, X } from 'lucide-react';

export function WholesaleDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content max-w-lg">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
                Operación B2B
              </p>
              <Dialog.Title className="mt-3 text-2xl font-semibold text-white">
                Cotización de mayoreo
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-6 text-neutral-400">
                Para contratos, volumen recurrente o condiciones logísticas
                especiales, solicita atención comercial directa.
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Cerrar">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <a
            href="mailto:ventas@gradocero.mx?subject=Cotización%20de%20mayoreo"
            className="primary-button mt-7 w-full justify-center py-3"
          >
            <Mail aria-hidden="true" className="size-5" />
            ventas@gradocero.mx
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
