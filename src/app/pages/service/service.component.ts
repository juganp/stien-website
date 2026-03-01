import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  readonly services = [
    { icon: 'ðŸ”¬', title: 'Custom Manufacturing', description: "We offer bespoke glassware manufacturing tailored to your specific research or industrial needs. Share your specifications and we'll craft the perfect solution." },
    { icon: 'ðŸšš', title: 'Global Distribution', description: 'With our extensive logistics network, we deliver precision glassware to over 50 countries. Fast, reliable, and secure packaging guaranteed.' },
    { icon: 'ðŸ› ï¸', title: 'Technical Support', description: 'Our team of glassware experts provides technical assistance for product selection, installation, and troubleshooting at no extra charge.' },
    { icon: 'ðŸ“‹', title: 'Bulk Orders & OEM', description: 'Special pricing and branding options available for bulk orders and OEM partnerships. Contact us for custom quotations.' },
    { icon: 'âœ…', title: 'Quality Certification', description: 'All products come with certificates of conformance and compliance documentation for regulatory requirements.' },
    { icon: 'ðŸŽ“', title: 'Lab Setup Consultancy', description: "Planning a new laboratory? Our consultants help you select the right equipment suite for your research goals and budget." },
  ];
}