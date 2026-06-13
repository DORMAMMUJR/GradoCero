import { Search } from 'lucide-react';

type CatalogFiltersProps = {
  categories: string[];
  category: string;
  query: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
};

export function CatalogFilters({
  categories,
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: CatalogFiltersProps) {
  return (
    <section
      aria-label="Filtros del catálogo"
      className="rounded-lg border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md lg:sticky lg:top-24"
    >
      <label className="relative block">
        <span className="sr-only">Buscar productos</span>
        <Search
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar por producto, SKU o categoría"
          className="w-full rounded-sm border border-white/10 bg-neutral-950/80 py-3 pl-10 pr-3 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-amber-500/60 focus:bg-neutral-950"
        />
      </label>

      <div className="mt-7 border-t border-white/10 pt-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">
          Categorías
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {categories.map((item) => {
            const isActive = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(item)}
                aria-pressed={isActive}
                className={`group flex shrink-0 items-center justify-between gap-4 border-l px-4 py-2.5 text-left text-sm transition ${
                  isActive
                    ? 'border-amber-500 bg-amber-500/10 font-semibold text-amber-300'
                    : 'border-white/10 text-neutral-400 hover:border-amber-500/40 hover:bg-white/[0.03] hover:text-neutral-100'
                }`}
              >
                <span>{item}</span>
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full transition ${
                    isActive
                      ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                      : 'bg-neutral-700 group-hover:bg-amber-500/50'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
