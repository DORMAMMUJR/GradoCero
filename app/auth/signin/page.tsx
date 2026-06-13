import { redirect } from 'next/navigation';
import { Chrome, Mail } from 'lucide-react';
import { auth, authProviderConfig, signIn } from '@/auth';
import { getSafeCallbackUrl } from '@/lib/auth/callback-url';

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const { callbackUrl: requestedCallbackUrl, error } = await searchParams;
  const callbackUrl = getSafeCallbackUrl(requestedCallbackUrl);

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12 text-neutral-100">
      <section className="glass-panel w-full max-w-md p-7 sm:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
          Cuenta Grado Cero
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold">
          Inicia sesión
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Clientes y administradores pueden acceder con un enlace seguro o con
          su cuenta de Google.
        </p>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300"
          >
            No fue posible iniciar sesión. Verifica tus datos e intenta de
            nuevo.
          </p>
        )}

        {authProviderConfig.resendEnabled && (
          <form
            className="mt-7"
            action={async (formData) => {
              'use server';
              const email = String(formData.get('email') || '').trim();
              await signIn('resend', { email, redirectTo: callbackUrl });
            }}
          >
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-neutral-200"
            >
              Correo electrónico
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nombre@empresa.com"
              className="field-control mt-2"
            />
            <button
              type="submit"
              className="primary-button mt-3 w-full justify-center py-3"
            >
              <Mail aria-hidden="true" className="size-5" />
              Enviar enlace de acceso
            </button>
          </form>
        )}

        {authProviderConfig.googleEnabled &&
          authProviderConfig.resendEnabled && (
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-500">
              <span className="h-px flex-1 bg-white/10" />
              o continúa con
              <span className="h-px flex-1 bg-white/10" />
            </div>
          )}

        {authProviderConfig.googleEnabled && (
          <form
            className={authProviderConfig.resendEnabled ? '' : 'mt-7'}
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: callbackUrl });
            }}
          >
            <button
              type="submit"
              className="secondary-button w-full justify-center py-3"
            >
              <Chrome aria-hidden="true" className="size-5" />
              Continuar con Google
            </button>
          </form>
        )}

        {!authProviderConfig.googleEnabled &&
          !authProviderConfig.resendEnabled && (
            <p className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200">
              Configura Google o Resend junto con AUTH_SECRET para habilitar el
              acceso.
            </p>
          )}
      </section>
    </main>
  );
}
