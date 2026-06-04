import { Component, HostListener, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  scrolled = signal(false);
  menuOpen = signal(false);
  isDark$ = this.themeService.isDark$;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 48);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    const el = document.getElementById(id);
    if (el) {
      const navH = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // Navigate to home with fragment — anchorScrolling will handle the scroll
      this.router.navigate(['/'], { fragment: id });
    }
  }
}
