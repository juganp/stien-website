import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly stats = [
    { value: '25+', label: 'Years of Excellence' },
    { value: '500+', label: 'Products in Catalog' },
    { value: '1000+', label: 'Satisfied Clients' },
    { value: '50+', label: 'Countries Served' },
  ];
}