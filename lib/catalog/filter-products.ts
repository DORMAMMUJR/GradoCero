type FilterableProduct = {
  name: string;
  sku: string;
  category: string;
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es-MX');
}

export function filterCatalogProducts<T extends FilterableProduct>(
  products: T[],
  query: string,
  category: string,
) {
  const normalizedQuery = normalize(query.trim());

  return products.filter((product) => {
    const matchesCategory =
      category === 'Todos' || product.category === category;
    const searchable = normalize(
      `${product.name} ${product.sku} ${product.category}`,
    );

    return matchesCategory && searchable.includes(normalizedQuery);
  });
}
