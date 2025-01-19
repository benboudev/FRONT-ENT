export interface StairConfig {
  width: number;
  height: number;
  depth: number;
  steps: number;
  material: string;
  finish: string;
}

export interface PriceQuote {
  totalPrice: number;
  materialCost: number;
  laborCost: number;
  estimatedTime: string;
}
