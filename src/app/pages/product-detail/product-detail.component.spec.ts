import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { CatalogService } from '../../core/services/catalog.service';
import { Product } from '../../core/models/catalog.models';

const mockProduct: Product = {
  id: '1', code: 'conical-flask', name: 'Conical Flask', description: 'A flask',
  categoryId: 'cat1', categoryName: 'Glassware', uomName: 'Piece',
  isFeatured: false, sellingPrice: null, taxRatePercent: null
};

describe('ProductDetailComponent', () => {
  const catalogServiceMock = { getProductByCode: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: CatalogService, useValue: catalogServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'conical-flask' } } } }
      ]
    });
  });

  it('creates the component', () => {
    catalogServiceMock.getProductByCode.mockReturnValue(of(mockProduct));
    const fixture = TestBed.createComponent(ProductDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads product on init', () => {
    catalogServiceMock.getProductByCode.mockReturnValue(of(mockProduct));
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.product()).toEqual(mockProduct);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.notFound()).toBe(false);
  });

  it('sets notFound on error', () => {
    catalogServiceMock.getProductByCode.mockReturnValue(throwError(() => new Error('404')));
    const fixture = TestBed.createComponent(ProductDetailComponent);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.notFound()).toBe(true);
    expect(fixture.componentInstance.loading()).toBe(false);
  });
});
