export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  categoryId: string;
  categoryName: string;
  uomName: string;
  isFeatured: boolean;
  sellingPrice: number | null;
  taxRatePercent: number | null;
}

export interface PagedProductResult {
  items: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
