import Link from 'next/link';
import { MailCheck } from 'lucide-react';

export default function VerifyRequestPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-neutral-100">
      <section className="glass-panel w-full max-w-md p-8 text-center">
        <MailCheck
          aria-hidden="true"
          className="mx-auto size-10 text-amber-400"
        />
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-amber-400">
          Enlace enviado
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold">
          Revisa tu correo
        </h1>
        <p className="mt-4 text-sm leading-6 text-neutral-400">
          Enviamos un enlace seguro para iniciar sesión. Puedes cerrar esta
          ventana después de abrirlo.
        </p>
        <Link
          href="/inicio"
          className="secondary-button mt-7 w-full justify-center py-3"
        >
          Volver al catálogo
        </Link>
      </section>
    </main>
  );
}
