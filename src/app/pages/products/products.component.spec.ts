import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductsComponent } from './products.component';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService } from '../../core/services/enquiry.service';
import { Product, PagedProductResult } from '../../core/models/catalog.models';

const mockProduct: Product = {
  id: '1', code: 'CF-100', name: 'Conical Flask', description: null,
  categoryId: 'cat1', categoryName: 'Flasks', uomName: 'Piece',
  isFeatured: false, sellingPrice: null, taxRatePercent: null
};

const mockPagedResult: PagedProductResult = {
  items: [mockProduct], totalCount: 1, page: 1, pageSize: 20, totalPages: 1
};

const emptyPagedResult: PagedProductResult = {
  items: [], totalCount: 0, page: 1, pageSize: 20, totalPages: 0
};

describe('ProductsComponent', () => {
  const catalogMock = {
    getCategories: vi.fn().mockReturnValue(of([])),
    getProducts: vi.fn().mockReturnValue(of(emptyPagedResult)),
  };
  const enquiryMock = { submitEnquiry: vi.fn() };

  const setup = async () => {
    vi.clearAllMocks();
    catalogMock.getProducts.mockReturnValue(of(emptyPagedResult));
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: CatalogService, useValue: catalogMock },
        { provide: EnquiryService, useValue: enquiryMock },
      ],
    }).compileComponents();
    return TestBed.createComponent(ProductsComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with no products before ngOnInit', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.products()).toEqual([]);
  });

  it('ngOnInit loads products via service', async () => {
    const fixture = await setup();
    // Override mock AFTER setup() resets it, before calling ngOnInit
    catalogMock.getProducts.mockReturnValue(of(mockPagedResult));
    catalogMock.getCategories.mockReturnValue(of([]));
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.products()).toEqual([mockProduct]);
    expect(fixture.componentInstance.totalCount()).toBe(1);
  });

  it('addToCart should add item to cart', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.addToCart(mockProduct);
    expect(comp.cart().length).toBe(1);
    expect(comp.cart()[0].quantity).toBe(1);
    expect(comp.cartCount()).toBe(1);
  });

  it('addToCart should increment quantity for existing item', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.addToCart(mockProduct);
    comp.addToCart(mockProduct);
    expect(comp.cart().length).toBe(1);
    expect(comp.cart()[0].quantity).toBe(2);
    expect(comp.cartCount()).toBe(2);
  });

  it('selectCategory should set selectedCategoryId and reload products', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    catalogMock.getProducts.mockReturnValue(of(mockPagedResult));
    comp.selectCategory('cat1');
    expect(comp.selectedCategoryId()).toBe('cat1');
    expect(comp.currentPage()).toBe(1);
    expect(catalogMock.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({ categoryId: 'cat1', page: 1 })
    );
  });

  it('onSortChange should update sort and reload', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.onSortChange('name_desc');
    expect(comp.currentSort()).toBe('name_desc');
    expect(catalogMock.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({ sort: 'name_desc' })
    );
  });

  it('goToPage should clamp to valid range', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.pagedResult.set({ items: [], totalCount: 40, page: 1, pageSize: 20, totalPages: 2 });
    comp.goToPage(0); // below min
    expect(comp.currentPage()).toBe(1); // unchanged
    comp.goToPage(3); // above max
    expect(comp.currentPage()).toBe(1); // unchanged
    comp.goToPage(2);
    expect(comp.currentPage()).toBe(2);
  });
});
