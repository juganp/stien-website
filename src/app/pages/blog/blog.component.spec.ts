import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    const fixture = TestBed.createComponent(BlogComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 3 posts', async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    const fixture = TestBed.createComponent(BlogComponent);
    expect(fixture.componentInstance.posts.length).toBe(3);
  });
});