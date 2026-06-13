export type CatalogProduct = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string;
  imageUrl: string | null;
  salePriceCents: number;
  stock: number;
  supplierName: string;
};

export type CartLine = {
  product: CatalogProduct;
  quantity: number;
};
