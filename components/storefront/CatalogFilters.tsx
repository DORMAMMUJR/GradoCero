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
      className="glass-panel grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_auto]"
    >
      <label className="relative block">
        <span className="sr-only">Buscar productos</span>
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar por producto, SKU o categoría"
          className="field-control pl-12"
        />
      </label>
      <label>
        <span className="sr-only">Categoría</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="field-control min-w-56"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
    </section>
  );
}
