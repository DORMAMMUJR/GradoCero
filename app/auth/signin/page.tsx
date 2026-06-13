import { redirect } from 'next/navigation';
import { auth, googleCredentialsConfigured, signIn } from '@/auth';
import { getSafeCallbackUrl } from '@/lib/auth/callback-url';

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const { callbackUrl: requestedCallbackUrl } = await searchParams;
  const callbackUrl = getSafeCallbackUrl(requestedCallbackUrl);

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-neutral-100">
      <section className="glass-panel w-full max-w-md p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
          Acceso administrativo
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Grado Cero</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Inicia sesión con una cuenta autorizada. El acceso requiere el rol
          ADMIN registrado en PostgreSQL.
        </p>

        {googleCredentialsConfigured ? (
          <form
            className="mt-8"
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: callbackUrl });
            }}
          >
            <button
              type="submit"
              className="primary-button w-full justify-center py-3"
            >
              Continuar con Google
            </button>
          </form>
        ) : (
          <p className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200">
            Configura AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET y AUTH_SECRET para
            habilitar el acceso.
          </p>
        )}
      </section>
    </main>
  );
}
