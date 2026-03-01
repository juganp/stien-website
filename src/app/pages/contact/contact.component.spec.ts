import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
      ],
    }).compileComponents();
    return TestBed.createComponent(ContactComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show error when submitting empty form', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    comp.submit();
    expect(comp.error()).toBe('Please fill in all required fields.');
    expect(comp.submitted()).toBe(false);
  });

  it('should start with submitted false', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.submitted()).toBe(false);
  });
});