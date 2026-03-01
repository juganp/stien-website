import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(AboutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 4 stats', async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(AboutComponent);
    expect(fixture.componentInstance.stats.length).toBe(4);
  });
});