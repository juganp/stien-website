import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CategoryPreview {
  name: string;
  count: number;
  icon: string;
}

@Component({
  selector: 'app-products-coming-soon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-coming-soon.component.html',
  styleUrl: './products-coming-soon.component.scss'
})
export class ProductsComingSoonComponent {
  categories: CategoryPreview[] = [
    { name: 'Volumetric', count: 2, icon: 'M12 2L12 6M12 6C8 6 6 10 6 14C6 18 8 22 12 22C16 22 18 18 18 14C18 10 16 6 12 6Z' },
    { name: 'Analytical', count: 1, icon: 'M8 2V6M8 6H4V22H20V6H16M8 6H16M16 2V6M10 12H14M12 10V14' },
    { name: 'Distillation', count: 3, icon: 'M9 3H15V8L19 14V20H5V14L9 8V3ZM9 3H15M7 14H17' },
    { name: 'General', count: 6, icon: 'M6 4H18L20 20H4L6 4ZM6 4H18M8 10H16' },
    { name: 'Specialty', count: 2, icon: 'M12 2C8 2 4 6 4 12L4 22H20L20 12C20 6 16 2 12 2ZM8 14H16M10 18H14' },
  ];

  scrollToContact(event: Event): void {
    event.preventDefault();
    window.location.href = '/#contact';
  }
}
