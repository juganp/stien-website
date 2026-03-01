import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', redirectTo: '' }]),
      ],
    }).compileComponents();
    return TestBed.createComponent(NavbarComponent);
  };

  it('should create', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 5 nav links', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.navLinks.length).toBe(5);
  });

  it('toggleMenu should toggle menuOpen', async () => {
    const fixture = await setup();
    const comp = fixture.componentInstance;
    expect(comp.menuOpen()).toBe(false);
    comp.toggleMenu();
    expect(comp.menuOpen()).toBe(true);
    comp.toggleMenu();
    expect(comp.menuOpen()).toBe(false);
  });

  it('should start not scrolled', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.isScrolled()).toBe(false);
  });
});