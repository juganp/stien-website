import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
      ],
    }).compileComponents();
    return TestBed.createComponent(HomeComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have static featured products', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.staticFeaturedProducts.length).toBe(4);
  });

  it('should have testimonials', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.testimonials.length).toBe(3);
  });

  it('should initialise featuredProducts signal as empty', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.featuredProducts()).toEqual([]);
  });
});