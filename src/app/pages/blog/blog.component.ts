import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  readonly posts = [
    { title: 'The Importance of Borosilicate Glass in Modern Laboratories', date: 'March 15, 2025', category: 'Science', excerpt: 'Discover why borosilicate glass remains the gold standard for laboratory applications, offering unmatched durability and chemical resistance.' },
    { title: 'How to Choose the Right Glassware for Your Research', date: 'February 28, 2025', category: 'Guide', excerpt: 'A comprehensive guide to selecting appropriate laboratory glassware based on your specific research requirements and budget.' },
    { title: 'Stien Expands Distribution Network to Southeast Asia', date: 'January 20, 2025', category: 'News', excerpt: 'We are excited to announce expanded distribution partnerships across Southeast Asia, making our products more accessible than ever.' },
  ];
}