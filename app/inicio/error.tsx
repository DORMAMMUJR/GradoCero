'use client';

import { useEffect } from 'react';

export default function InicioError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Attempt automatic recovery when an error boundary is hit
    reset();
  }, [reset]);

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 text-neutral-100">
      <div className="glass-panel max-w-md p-8 text-center">
        <h1 className="text-2xl font-semibold">Cargando catálogo...</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Cargando vista principal...
        </p>
        <button type="button" onClick={reset} className="primary-button mt-6">
          Ingresar al catálogo
        </button>
      </div>
    </main>
  );
}

