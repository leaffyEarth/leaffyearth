export interface IPlant {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  offer?: {
    type: 'percentage' | 'fixed';
    value: number;
    label: string;
  };
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface IPlantFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export interface IPlantsResponse {
  plants: IPlant[];
  total: number;
  page: number;
  totalPages: number;
} 