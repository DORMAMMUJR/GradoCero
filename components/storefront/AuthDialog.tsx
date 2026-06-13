'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { Chrome, LoaderCircle, Mail, X } from 'lucide-react';

export function AuthDialog({
  googleEnabled,
  open,
  onOpenChange,
  resendEnabled,
}: {
  googleEnabled: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resendEnabled: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle',
  );

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const result = await signIn('resend', {
      email,
      redirect: false,
      redirectTo: '/inicio',
    });

    setStatus(result.ok ? 'sent' : 'error');
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content auth-dialog max-w-md">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Cuenta Grado Cero
              </p>
              <Dialog.Title className="mt-3 font-display text-3xl font-semibold text-white">
                Inicia sesión
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-6 text-neutral-400">
                Accede a tu cuenta de cliente o continúa al panel si tienes
                permisos administrativos.
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Cerrar">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <form className="mt-7" onSubmit={handleEmailSignIn}>
            <label
              htmlFor="auth-email"
              className="text-sm font-medium text-neutral-200"
            >
              Correo electrónico
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={!resendEnabled || status === 'loading'}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@empresa.com"
              className="field-control mt-2"
            />
            <button
              type="submit"
              disabled={!resendEnabled || status === 'loading'}
              className="primary-button mt-3 w-full justify-center py-3"
            >
              {status === 'loading' ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-5 animate-spin"
                />
              ) : (
                <Mail aria-hidden="true" className="size-5" />
              )}
              Enviar enlace de acceso
            </button>
          </form>

          {status === 'sent' && (
            <p role="status" className="mt-3 text-sm text-emerald-400">
              Revisa tu correo para continuar.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="mt-3 text-sm text-red-300">
              No fue posible enviar el enlace. Intenta nuevamente.
            </p>
          )}
          {!resendEnabled && (
            <p className="mt-3 text-xs text-neutral-500">
              El acceso por correo estará disponible al configurar Resend.
            </p>
          )}

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-500">
            <span className="h-px flex-1 bg-white/10" />
            o continúa con
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            disabled={!googleEnabled}
            onClick={() => signIn('google', { redirectTo: '/inicio' })}
            className="secondary-button w-full justify-center py-3"
          >
            <Chrome aria-hidden="true" className="size-5" />
            Continuar con Google
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
