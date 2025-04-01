export interface Planter {
  _id: string;
  planterCategory: string;
  planterSeries: string;
  description: string;
  size: "small" | "medium" | "large" | "extra-large";
  color: Color;
  dimensions: Dimension;
  price: number;
  sku: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Dimension {
  length: number;
  width: number;
  height: number;
}
