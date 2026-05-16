import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'stien-theme';
  private _dark$ = new BehaviorSubject<boolean>(false);
  readonly isDark$ = this._dark$.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const isDark = saved !== 'light';
    this._dark$.next(isDark);
    this.applyTheme(isDark);
  }

  toggle(): void {
    const next = !this._dark$.value;
    this._dark$.next(next);
    this.applyTheme(next);
    localStorage.setItem(this.STORAGE_KEY, next ? 'dark' : 'light');
  }

  get isDark(): boolean {
    return this._dark$.value;
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
