import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { Product } from '../../core/models/catalog.models';

describe('ProductsComponent', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
      ],
    }).compileComponents();
    return TestBed.createComponent(ProductsComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with no products', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.products()).toEqual([]);
  });

  it('addToCart should add item to cart', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    const product: Product = { id: '1', code: 'CF-100', name: 'Conical Flask', description: null, categoryId: 'cat1', categoryName: 'Flasks', uomName: 'Piece', sellingPrice: 10, taxRatePercent: 5 };
    comp.addToCart(product);
    expect(comp.cart().length).toBe(1);
    expect(comp.cart()[0].quantity).toBe(1);
    expect(comp.cartCount()).toBe(1);
  });

  it('addToCart should increment quantity for existing item', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    const product: Product = { id: '1', code: 'CF-100', name: 'Conical Flask', description: null, categoryId: 'cat1', categoryName: 'Flasks', uomName: 'Piece', sellingPrice: 10, taxRatePercent: 5 };
    comp.addToCart(product);
    comp.addToCart(product);
    expect(comp.cart().length).toBe(1);
    expect(comp.cart()[0].quantity).toBe(2);
    expect(comp.cartCount()).toBe(2);
  });

  it('selectCategory should filter products', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.products.set([
      { id: '1', code: 'CF-100', name: 'Conical Flask', description: null, categoryId: 'cat1', categoryName: 'Flasks', uomName: 'Piece', sellingPrice: 10, taxRatePercent: 5 },
      { id: '2', code: 'CT-200', name: 'Centrifuge Tube', description: null, categoryId: 'cat2', categoryName: 'Tubes', uomName: 'Piece', sellingPrice: 5, taxRatePercent: 5 },
    ]);
    comp.selectCategory('cat1');
    expect(comp.filteredProducts().length).toBe(1);
    expect(comp.filteredProducts()[0].name).toBe('Conical Flask');
  });
});