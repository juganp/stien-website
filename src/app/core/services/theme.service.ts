import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal(false);
  readonly isDark = this._isDark.asReadonly();

  constructor() {
    // Restore persisted preference
    const stored = typeof localStorage !== 'undefined'
      ? localStorage.getItem('stien-theme')
      : null;
    const prefersDark = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (stored === null && prefersDark);
    this._isDark.set(initial);
    this.applyTheme(initial);
  }

  toggle(): void {
    const next = !this._isDark();
    this._isDark.set(next);
    this.applyTheme(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('stien-theme', next ? 'dark' : 'light');
    }
  }

  private applyTheme(dark: boolean): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
  }
}
