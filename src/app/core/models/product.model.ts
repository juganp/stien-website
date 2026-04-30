export interface ProductSpec {
  label: string;
  value: string;
}

export type ProductSilhouette =
  | 'volumetric-flask'
  | 'burette'
  | 'condenser'
  | 'kjeldahl-flask'
  | 'beaker'
  | 'erlenmeyer'
  | 'petri-dish'
  | 'test-tube'
  | 'separatory-funnel'
  | 'round-bottom-flask'
  | 'graduated-cylinder'
  | 'reagent-bottle'
  | 'watch-glass'
  | 'distillation-flask';

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: 'volumetric' | 'analytical' | 'distillation' | 'general' | 'specialty';
  material: string;
  classType: 'Class A' | 'Class B' | 'Standard';
  sizes: string[];
  tolerance: string;
  thermalSpec: string;
  standard: string;
  specs: ProductSpec[];
  description: string;
  featured: boolean;
  silhouette?: ProductSilhouette;
  iconUrl?: string;
}
