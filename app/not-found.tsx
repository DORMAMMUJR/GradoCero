import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 text-neutral-100">
      <section className="glass-panel max-w-md p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400">404</p>
        <h1 className="mt-3 text-2xl font-semibold">Recurso no encontrado</h1>
        <Link href="/inicio" className="primary-button mt-6">
          Volver al catálogo
        </Link>
      </section>
    </main>
  );
}
