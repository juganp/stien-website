import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', redirectTo: '' }]),
      ],
    }).compileComponents();
    return TestBed.createComponent(FooterComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have current year', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.currentYear).toBe(new Date().getFullYear());
  });
});