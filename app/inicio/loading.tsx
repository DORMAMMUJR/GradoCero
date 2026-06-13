export default function InicioLoading() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-lg font-semibold tracking-[0.18em]">
            GRADO <span className="text-amber-400">CERO</span>
          </span>
          <div className="flex gap-2">
            <div className="size-10 animate-pulse rounded-xl bg-white/5" />
            <div className="size-10 animate-pulse rounded-xl bg-white/5" />
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="h-3 w-40 animate-pulse rounded bg-amber-400/20" />
          <div className="mt-6 h-12 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-white/5" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7">
          <div className="h-3 w-24 animate-pulse rounded bg-amber-400/20" />
          <div className="mt-3 h-8 w-56 animate-pulse rounded bg-white/10" />
        </div>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 shrink-0 animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/70"
            >
              <div className="aspect-[4/3] animate-pulse bg-neutral-800" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-16 animate-pulse rounded bg-amber-400/20" />
                <div className="h-5 w-48 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                <div className="flex items-end justify-between pt-2">
                  <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-10 w-28 animate-pulse rounded-xl bg-amber-400/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
