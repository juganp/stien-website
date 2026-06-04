import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('productsGrid') private gridRef!: ElementRef<HTMLElement>;
  private productsService = inject(ProductsService);
  featured: Product[] = [];

  ngOnInit(): void {
    this.productsService.getFeatured().subscribe(p => this.featured = p);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(this.gridRef.nativeElement);
  }
}
