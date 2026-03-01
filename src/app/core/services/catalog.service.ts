import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../models/catalog.models';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.config.apiBaseUrl}/api/public/catalog/categories`);
  }

  getProducts(categoryId?: string): Observable<Product[]> {
    const url = categoryId
      ? `${this.config.apiBaseUrl}/api/public/catalog/products?categoryId=${categoryId}`
      : `${this.config.apiBaseUrl}/api/public/catalog/products`;
    return this.http.get<Product[]>(url);
  }
}
