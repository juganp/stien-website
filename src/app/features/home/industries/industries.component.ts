import { Component, signal } from '@angular/core';

type TabId = 'education' | 'pharma' | 'industrial';

interface IndustryTab {
  id: TabId;
  label: string;
  headline: string;
  body: string;
  products: string[];
  spec: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent {
  activeTab = signal<TabId>('education');

  readonly tabs: IndustryTab[] = [
    {
      id: 'education',
      label: 'Education',
      headline: 'Certified for the Curriculum',
      body: 'Educational institutions from secondary schools to research universities rely on our glassware for practical laboratory sessions. Affordable, durable, and dimensionally consistent — certified for standard science syllabi across Tamil Nadu and beyond. Our Griffin Beakers, Erlenmeyer Flasks, and Test Tubes are built to withstand the repeated use of busy teaching labs.',
      products: ['Griffin Beaker', 'Erlenmeyer Flask', 'Borosilicate Test Tube', 'Watch Glass', 'Petri Dish', 'Graduated Cylinder Class B'],
      spec: 'Syllabus-compliant • Durable • Affordable',
    },
    {
      id: 'pharma',
      label: 'Pharmaceutical & R&D',
      headline: 'Class A Precision for Critical Analysis',
      body: 'Pharmaceutical quality control and R&D laboratories demand Class A accuracy with full documentation traceability. Our volumetric flasks, burettes, and Kjeldahl apparatus are manufactured to ASTM E288 and ASTM E287 standards — delivering the ±0.03–0.40 mL tolerances required for validated analytical methods under GMP and GLP environments.',
      products: ['Class A Volumetric Flask', 'Class A Burette', 'Kjeldahl Digestion Flask', 'Liebig Condenser', 'Separatory Funnel', 'Reagent Bottle Amber'],
      spec: 'Class A Accuracy • ASTM E288 • GMP Compatible',
    },
    {
      id: 'industrial',
      label: 'Industrial',
      headline: 'Robust Apparatus for Process Chemistry',
      body: 'Industrial chemistry, quality assurance laboratories, and process R&D facilities require glassware that performs reliably under demanding conditions. Our distillation flasks, round-bottom flasks, and condenser sets are constructed with uniform-wall 3.3 Borosilicate Glass — chemical resistance Class HGB1, thermal shock resistance ΔT ≥ 120°C.',
      products: ['Distillation Flask', 'Round-Bottom Flask', 'Liebig Condenser', 'Separatory Funnel', 'Reagent Bottle Clear', 'Porcelain Crucible'],
      spec: 'HGB1 Chemical Resistance • ΔT ≥ 120°C • Industrial Grade',
    },
  ];

  get activeData(): IndustryTab {
    return this.tabs.find(t => t.id === this.activeTab())!;
  }

  selectTab(id: TabId): void {
    this.activeTab.set(id);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
