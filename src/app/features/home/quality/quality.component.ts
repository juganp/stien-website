import { Component } from '@angular/core';

@Component({
  selector: 'app-quality',
  standalone: true,
  templateUrl: './quality.component.html',
  styleUrl: './quality.component.scss'
})
export class QualityComponent {
  readonly pillars = [
    {
      icon: 'material',
      title: '3.3 Borosilicate Glass',
      body: 'All apparatus manufactured from Type I 3.3 Borosilicate Glass — aligned with ASTM E438 material composition requirements. Low thermal expansion coefficient: 3.3 × 10⁻⁶ K⁻¹.',
      spec: 'ASTM E438 Type I',
    },
    {
      icon: 'tolerance',
      title: 'Dimensional Tolerances',
      body: 'Manufactured to international dimensional tolerances. Class A volumetric ware calibrated at 20°C reference temperature with traceable measurement equipment.',
      spec: 'Class A: ±0.03–0.40 mL',
    },
    {
      icon: 'thermal',
      title: 'Thermal Shock Resistance',
      body: 'Each product line validated for thermal shock resistance of ΔT ≥ 120°C. Safe for open-flame heating, autoclave sterilisation, and cryogenic protocols.',
      spec: 'ΔT ≥ 120°C',
    },
    {
      icon: 'batch',
      title: 'Batch Traceability',
      body: 'Traceable manufacturing processes with batch-level quality validation protocols. Every production run documented from raw material intake to final dispatch.',
      spec: 'Full batch records',
    },
    {
      icon: 'chemical',
      title: 'Chemical Resistance',
      body: 'Hydrolytic resistance Class 1 (HGB1) — resistant to concentrated acids, alkalis, and most organic solvents. Conforms to DIN 12331 chemical durability requirements.',
      spec: 'DIN 12331 HGB1',
    },
    {
      icon: 'marking',
      title: 'Permanent Graduation Marks',
      body: 'Screen-printed, kiln-fired graduation markings for permanence. Resistant to solvents, autoclaving, and repeated use. White on amber, white on clear variants available.',
      spec: 'Kiln-fired ceramic ink',
    },
  ];
}
