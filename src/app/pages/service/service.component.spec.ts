import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ServiceComponent } from './service.component';

describe('ServiceComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(ServiceComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 6 services', async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(ServiceComponent);
    expect(fixture.componentInstance.services.length).toBe(6);
  });
});