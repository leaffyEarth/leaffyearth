export interface IPlanterVariant {
  planter: {
    _id: string;
    name: string;
    planterCategory: string;
    planterSeries: string;
    dimensions: string;
    color: {
      name: string;
      hex: string;
    };
    price: number;
    images: string[];
    size: string;
    sku: string;
    description: string;
  };
  images: string[];
  colors: string[];
}

export interface IPlant {
  _id: string;
  name: string;
  plantSeries: string;
  description: string;
  size: string;
  type: string[];
  lightExposure: string;
  idealLocation: string[];
  maintenance: string;
  watering: string;
  tags: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
    _id: string;
  };
  images: string[];
  price: number;
  sku: string;
  planterVariants: IPlanterVariant[];
}

export interface IPlantFilters {
  plantSeries?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export interface IPlantsResponse {
  data: IPlant[];
  page: number;
  totalPages: number;
  limit: number;
  total: number;
} 