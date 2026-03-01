export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  categoryId: string;
  categoryName: string;
  uomName: string;
  sellingPrice: number;
  taxRatePercent: number;
}
