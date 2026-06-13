import { describe, expect, it } from 'vitest';
import { filterCatalogProducts } from './filter-products';

const products = [
  { name: 'Cloro industrial', sku: 'QUI-001', category: 'Químicos' },
  { name: 'Toalla interdoblada', sku: 'PAP-002', category: 'Papel' },
];

describe('filterCatalogProducts', () => {
  it('filters by normalized text and category', () => {
    expect(filterCatalogProducts(products, 'quimicos', 'Todos')).toHaveLength(1);
    expect(filterCatalogProducts(products, 'PAP-002', 'Papel')).toEqual([
      products[1],
    ]);
  });

  it('returns the full catalog when no filters are active', () => {
    expect(filterCatalogProducts(products, '', 'Todos')).toEqual(products);
  });
});
