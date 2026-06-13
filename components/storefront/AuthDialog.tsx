'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { LogIn, X } from 'lucide-react';

export function AuthDialog({
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
        <Dialog.Content className="dialog-content max-w-md">
          <div className="flex justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-white">
                Acceso seguro
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-6 text-neutral-400">
                Las cuentas autorizadas ingresan mediante Google OIDC. No se
                almacenan contraseñas en el navegador.
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Cerrar">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <Link
            href="/auth/signin?callbackUrl=/admin"
            className="primary-button mt-7 w-full justify-center py-3"
          >
            <LogIn aria-hidden="true" className="size-5" />
            Continuar
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
