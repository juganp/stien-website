import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { AboutComponent } from './about/about.component';
import { GeoRoadmapComponent } from './geo-roadmap/geo-roadmap.component';
import { QualityComponent } from './quality/quality.component';
import { IndustriesComponent } from './industries/industries.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SHOW_GEO_ROADMAP } from './geo-roadmap/geo-roadmap.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturedProductsComponent,
    AboutComponent,
    GeoRoadmapComponent,
    QualityComponent,
    IndustriesComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly showGeoRoadmap = SHOW_GEO_ROADMAP;
}
