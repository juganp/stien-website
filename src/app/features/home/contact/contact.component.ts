import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    this.submitted.set(true);
  }

  resetForm(): void {
    this.form = { name: '', organisation: '', email: '', phone: '', products: '', message: '' };
    this.submitted.set(false);
  }
}
