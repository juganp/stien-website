import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private animFrame = 0;
  private particles: Array<{x: number; y: number; r: number; vx: number; vy: number; o: number; color: string}> = [];

  readonly stats = [
    { value: '25+', label: 'Years Manufacturing' },
    { value: '15+', label: 'Product Lines' },
    { value: '10+', label: 'Cities Served' },
  ];

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.initParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const colors = ['rgba(200,151,255,', 'rgba(153,213,255,'];
    for (let i = 0; i < 32; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        o: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * 2)],
      });
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.o + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }
}
