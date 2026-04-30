import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly milestones = [
    { year: '2000', event: 'Founded in Tirunelveli, Tamil Nadu. Class A volumetric apparatus manufactured from the first production line.' },
    { year: '2002', event: 'Relocated to own manufacturing facility, establishing a dedicated production base.' },
    { year: '2005', event: 'First supply relationships established with institutions beyond South Tamil Nadu.' },
    { year: '2023', event: 'UDYAM registration achieved — formally recognised as a manufacturing enterprise.' },
    { year: '2024', event: 'Brand identity formalised with trademark registration.' },
    { year: '2025', event: '25th year of continuous manufacturing. 15+ product lines serving institutions across South India.' },
  ];
}
