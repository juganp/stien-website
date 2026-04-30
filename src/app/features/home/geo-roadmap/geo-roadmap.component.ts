import { Component } from '@angular/core';

export const SHOW_GEO_ROADMAP = true;

@Component({
  selector: 'app-geo-roadmap',
  standalone: true,
  templateUrl: './geo-roadmap.component.html',
  styleUrl: './geo-roadmap.component.scss'
})
export class GeoRoadmapComponent {
  readonly regions = [
    {
      id: 'south-tn',
      name: 'South Tamil Nadu',
      label: 'Home Territory',
      description: '25 years of unbroken manufacturing heritage serving educational institutions, research laboratories, and industrial facilities across the southern districts.',
      cities: ['Tirunelveli', 'Tuticorin', 'Nagercoil', 'Madurai'],
      cityNote: 'and surrounding districts',
    },
    {
      id: 'north-tn',
      name: 'Tamil Nadu',
      label: 'Broader Reach',
      description: 'Established institutional and industrial relationships across the state, supplying precision apparatus to academic and R&D buyers.',
      cities: ['Chennai', 'Kancheepuram', 'Manaparai'],
      cityNote: null,
    },
    {
      id: 'kerala',
      name: 'Kerala',
      label: 'Cross-State Presence',
      description: 'Growing presence serving academic institutions and research laboratories across key districts.',
      cities: ['Kottayam', 'Changanacherry', 'Kollam'],
      cityNote: 'and more',
    },
  ];
}
