import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../../core/services/enquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly enquiryService = inject(EnquiryService);

  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly error = signal('');

  form = {
    customerName: '',
    customerEmail: '',
    companyName: '',
    phone: '',
    message: '',
  };

  submit() {
    if (!this.form.customerName || !this.form.customerEmail || !this.form.message) {
      this.error.set('Please fill in all required fields.');
      return;
    }
    this.submitting.set(true);
    this.error.set('');
    this.enquiryService.submitEnquiry({
      customerName: this.form.customerName,
      customerEmail: this.form.customerEmail,
      companyName: this.form.companyName || null,
      phone: this.form.phone || null,
      message: this.form.message,
      productRequests: [],
    }).subscribe({
      next: () => { this.submitted.set(true); this.submitting.set(false); },
      error: () => { this.error.set('Failed to send message. Please try again.'); this.submitting.set(false); }
    });
  }
}