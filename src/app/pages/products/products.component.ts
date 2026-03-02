import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService } from '../../core/services/enquiry.service';
import { Category, PagedProductResult, Product } from '../../core/models/catalog.models';
import { ProductRequestItem } from '../../core/models/enquiry.models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly catalogService = inject(CatalogService);
  private readonly enquiryService = inject(EnquiryService);
  private readonly destroy$ = new Subject<void>();
  private readonly searchInput$ = new Subject<string>();

  readonly categories = signal<Category[]>([]);
  readonly pagedResult = signal<PagedProductResult | null>(null);
  readonly loading = signal(false);
  readonly selectedCategoryId = signal<string | undefined>(undefined);
  readonly searchTerm = signal('');
  readonly currentSort = signal('name_asc');
  readonly currentPage = signal(1);
  readonly pageSize = 20;

  readonly enquirySuccess = signal(false);
  readonly enquiryError = signal('');
  readonly cart = signal<ProductRequestItem[]>([]);
  readonly cartCount = computed(() => this.cart().reduce((sum, i) => sum + i.quantity, 0));
  readonly showEnquiryForm = signal(false);

  enquiryForm = {
    customerName: '',
    customerEmail: '',
    companyName: '',
    phone: '',
    message: '',
  };

  readonly sortOptions = [
    { value: 'name_asc', label: 'Name (A–Z)' },
    { value: 'name_desc', label: 'Name (Z–A)' },
    { value: 'price_asc', label: 'Price (Low–High)' },
    { value: 'price_desc', label: 'Price (High–Low)' },
  ];

  readonly products = computed(() => this.pagedResult()?.items ?? []);
  readonly totalCount = computed(() => this.pagedResult()?.totalCount ?? 0);
  readonly totalPages = computed(() => this.pagedResult()?.totalPages ?? 1);
  readonly showingFrom = computed(() => this.totalCount() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1);
  readonly showingTo = computed(() => Math.min(this.currentPage() * this.pageSize, this.totalCount()));

  readonly productIcons: Record<string, string> = {
    'Air Condensers': '1 - Air Condensers.png',
    'Centrifuge Tubes': '2 - Centrifuge Tubes.png',
    'Conical Flasks': '3 - Conical Flasks.png',
    'Graduated Cylinders': '4 - Graduated Cylinders.png',
  };

  ngOnInit() {
    this.catalogService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => {}
    });

    this.searchInput$.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.searchTerm.set(term);
      this.currentPage.set(1);
      this.loadProducts();
    });

    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.loading.set(true);
    this.catalogService.getProducts({
      categoryId: this.selectedCategoryId(),
      search: this.searchTerm() || undefined,
      page: this.currentPage(),
      pageSize: this.pageSize,
      sort: this.currentSort(),
    }).subscribe({
      next: (result) => { this.pagedResult.set(result); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  selectCategory(id: string | undefined) {
    this.selectedCategoryId.set(id);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onSearchInput(term: string) {
    this.searchInput$.next(term);
  }

  onSortChange(sort: string) {
    this.currentSort.set(sort);
    this.currentPage.set(1);
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadProducts();
  }

  getProductIcon(name: string): string {
    return this.productIcons[name] ?? '3 - Conical Flasks.png';
  }

  addToCart(product: Product) {
    const existing = this.cart().find(i => i.productName === product.name);
    if (existing) {
      this.cart.update(items => items.map(i =>
        i.productName === product.name ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.cart.update(items => [...items, { productName: product.name, quantity: 1 }]);
    }
  }

  submitEnquiry() {
    this.enquiryService.submitEnquiry({
      customerName: this.enquiryForm.customerName,
      customerEmail: this.enquiryForm.customerEmail,
      companyName: this.enquiryForm.companyName || null,
      phone: this.enquiryForm.phone || null,
      message: this.enquiryForm.message,
      productRequests: this.cart(),
    }).subscribe({
      next: () => {
        this.enquirySuccess.set(true);
        this.showEnquiryForm.set(false);
        this.cart.set([]);
        this.enquiryForm = { customerName: '', customerEmail: '', companyName: '', phone: '', message: '' };
      },
      error: () => { this.enquiryError.set('Failed to submit enquiry. Please try again.'); }
    });
  }
}
