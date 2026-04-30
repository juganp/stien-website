import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

// TODO: Replace placeholder data with real customer testimonials and confirmed institution names

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  institution: string;
  location: string;
  initials: string;
}

interface Institution {
  name: string;
  type: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('testimonialsGrid') private gridRef!: ElementRef<HTMLElement>;
  @ViewChild('institutionsStrip') private stripRef!: ElementRef<HTMLElement>;

  // TODO: Replace with real customer quotes
  readonly testimonials: Testimonial[] = [
    {
      id: 'placeholder-1',
      quote: 'The volumetric accuracy of Stien\'s Class A flasks has been consistently reliable across every batch we have received. Our laboratory team depends on them for every titrimetric and gravimetric analysis we conduct.',
      name: 'Name, Designation',
      role: 'Laboratory Supervisor',
      institution: 'Institution Name',
      location: 'Tirunelveli, Tamil Nadu',
      initials: 'NP',
    },
    {
      id: 'placeholder-2',
      quote: 'We evaluated several suppliers before choosing Stien Glassware. The batch-level documentation and dimensional consistency set them apart — every piece meets our specification without exception.',
      name: 'Name, Designation',
      role: 'Head of Department',
      institution: 'Institution Name',
      location: 'Kottayam, Kerala',
      initials: 'HD',
    },
    {
      id: 'placeholder-3',
      quote: 'A dependable partner for our institution\'s laboratory requirements for many years. Supply has been consistent, communication is responsive, and the Class A apparatus performs exactly as specified for our programmes.',
      name: 'Name, Designation',
      role: 'Procurement Officer',
      institution: 'Institution Name',
      location: 'Chennai, Tamil Nadu',
      initials: 'PO',
    },
  ];

  // TODO: Replace with confirmed institution names (with permission)
  readonly institutions: Institution[] = [
    { name: 'Institution Name', type: 'Government College · Tamil Nadu' },
    { name: 'Institution Name', type: 'Engineering College · Tamil Nadu' },
    { name: 'Institution Name', type: 'Research Laboratory · Tamil Nadu' },
    { name: 'Institution Name', type: 'Educational Institution · Kerala' },
    { name: 'Institution Name', type: 'Pharmaceutical Laboratory · Tamil Nadu' },
    { name: 'Institution Name', type: 'Industrial Facility · Tamil Nadu' },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.10 }
    );
    observer.observe(this.gridRef.nativeElement);
  }
}
