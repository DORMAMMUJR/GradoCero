'use client';

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="glass-panel max-w-xl p-8">
      <h1 className="text-2xl font-semibold text-white">
        Datos administrativos no disponibles
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-400">
        La consulta a PostgreSQL falló. No se sustituyeron resultados por datos
        ficticios.
      </p>
      <button type="button" onClick={reset} className="primary-button mt-6">
        Reintentar
      </button>
    </main>
  );
}
