import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, PagedProductResult, Product } from '../models/catalog.models';
import { ConfigService } from './config.service';

export interface ProductQueryParams {
  categoryId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.config.apiBaseUrl}/api/public/catalog/categories`);
  }

  getProducts(params: ProductQueryParams = {}): Observable<PagedProductResult> {
    let httpParams = new HttpParams();
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.page != null) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize != null) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    return this.http.get<PagedProductResult>(
      `${this.config.apiBaseUrl}/api/public/catalog/products`,
      { params: httpParams }
    );
  }

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.config.apiBaseUrl}/api/public/catalog/products/${code}`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiBaseUrl}/api/public/catalog/products/featured`);
  }
}
