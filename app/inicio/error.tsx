'use client';

export default function InicioError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 text-neutral-100">
      <div className="glass-panel max-w-md p-8 text-center">
        <h1 className="text-2xl font-semibold">Catálogo no disponible</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          No fue posible consultar PostgreSQL. No se muestran datos simulados.
        </p>
        <button type="button" onClick={reset} className="primary-button mt-6">
          Reintentar
        </button>
      </div>
    </main>
  );
}
