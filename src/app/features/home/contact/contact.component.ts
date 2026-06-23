import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../../../core/services/enquiry.service';

interface QuoteForm {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  products: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly enquiryService = inject(EnquiryService);
  submitted = signal(false);

  form: QuoteForm = {
    name: '',
    organisation: '',
    email: '',
    phone: '',
    products: '',
    message: '',
  };

  onSubmit(): void {
    this.enquiryService.submit({
      customerName: this.form.name,
      customerEmail: this.form.email,
      companyName: this.form.organisation,
      phone: this.form.phone,
      message: this.form.message,
      productRequests: this.form.products
        ? [{ productName: this.form.products, quantity: 1 }]
        : [],
    }).subscribe({
      next: () => this.submitted.set(true),
      error: () => this.submitted.set(true),
    });
  }

  resetForm(): void {
    this.form = { name: '', organisation: '', email: '', phone: '', products: '', message: '' };
    this.submitted.set(false);
  }
}
