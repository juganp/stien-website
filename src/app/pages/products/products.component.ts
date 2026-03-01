import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService } from '../../core/services/enquiry.service';
import { Category, Product } from '../../core/models/catalog.models';
import { ProductRequestItem } from '../../core/models/enquiry.models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly enquiryService = inject(EnquiryService);

  readonly categories = signal<Category[]>([]);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly selectedCategoryId = signal<string | undefined>(undefined);
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

  readonly filteredProducts = computed(() => {
    const catId = this.selectedCategoryId();
    if (!catId) return this.products();
    return this.products().filter(p => p.categoryId === catId);
  });

  readonly productIcons: Record<string, string> = {
    'Air Condensers': '1 - Air Condensers.png',
    'Centrifuge Tubes': '2 - Centrifuge Tubes.png',
    'Conical Flasks': '3 - Conical Flasks.png',
    'Graduated Cylinders': '4 - Graduated Cylinders.png',
  };

  ngOnInit() {
    this.loading.set(true);
    this.catalogService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => {}
    });
    this.catalogService.getProducts().subscribe({
      next: (prods) => { this.products.set(prods); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  selectCategory(id: string | undefined) {
    this.selectedCategoryId.set(id);
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