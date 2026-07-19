export type PricingCategory = 'G2' | 'G';

export interface PricingPackage {
  id?: string;
  category: PricingCategory;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted: boolean;
  sort_order: number;
}
