'use client';

import Link from 'next/link';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 text-neutral-100">
      <section className="glass-panel max-w-md p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
          Error de aplicación
        </p>
        <h1 className="mt-3 text-2xl font-semibold">
          No pudimos cargar esta vista
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          El fallo fue registrado. Puedes reintentar o volver al catálogo.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={reset} className="primary-button">
            Reintentar
          </button>
          <Link href="/inicio" className="secondary-button">
            Catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
