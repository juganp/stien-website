import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Product } from '../../core/models/catalog.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);

  readonly featuredProducts = signal<Product[]>([]);

  readonly testimonials = [
    { name: 'Dr. Sarah Johnson', role: 'Research Scientist', text: 'Stien glassware has been essential to our research. The quality and precision are unmatched in the industry.', avatar: 'Client Icon - 1.png' },
    { name: 'Prof. Michael Chen', role: 'University Lab Director', text: 'We have been sourcing our laboratory equipment from Stien for over 10 years. Consistently excellent products.', avatar: 'Client Icon - 2.png' },
    { name: 'Dr. Priya Sharma', role: 'Pharmaceutical R&D', text: 'The borosilicate glass quality meets all our stringent standards. Highly recommended for any lab setup.', avatar: 'Client Icon - 3.png' },
  ];

  readonly staticFeaturedProducts = [
    { name: 'Air Condensers', description: 'High-quality condensers for lab and industrial use', icon: '1 - Air Condensers.png' },
    { name: 'Centrifuge Tubes', description: 'Precision-crafted tubes for research and chemical analysis', icon: '2 - Centrifuge Tubes.png' },
    { name: 'Conical Flasks', description: 'Durable, low-expansion borosilicate glass flasks for lab applications', icon: '3 - Conical Flasks.png' },
    { name: 'Graduated Cylinders', description: 'Precision-crafted tubes for research and chemical analysis', icon: '4 - Graduated Cylinders.png' },
  ];

  ngOnInit() {
    this.catalogService.getProducts().subscribe({
      next: (products) => this.featuredProducts.set(products.slice(0, 4)),
      error: () => { this.featuredProducts.set([]); }
    });
  }
}