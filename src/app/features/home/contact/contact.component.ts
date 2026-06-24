import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
  submitting = signal(false);
  submitError = signal<string | null>(null);

  readonly emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  readonly phonePattern = /^[+]?[\d\s\-().]{7,20}$/;

  form: QuoteForm = {
    name: '',
    organisation: '',
    email: '',
    phone: '',
    products: '',
    message: '',
  };

  onSubmit(): void {
    this.submitError.set(null);
    this.submitting.set(true);

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
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        if (err.status === 400) {
          const apiMessage: string | undefined = err.error?.message ?? err.error?.error;
          this.submitError.set(apiMessage ?? 'One or more fields are invalid. Please review your details and try again.');
        } else if (err.status === 0) {
          this.submitError.set('Unable to reach the server. Please check your connection and try again.');
        } else {
          this.submitError.set('Something went wrong on our end. Please try again shortly or contact us directly.');
        }
      },
    });
  }

  resetForm(): void {
    this.form = { name: '', organisation: '', email: '', phone: '', products: '', message: '' };
    this.submitted.set(false);
    this.submitError.set(null);
  }
}
