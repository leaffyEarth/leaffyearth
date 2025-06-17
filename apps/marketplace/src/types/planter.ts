export interface IPlanter {
  _id: string;
  name: string;
  planterSeries: string;
  planterCategory: string;
  description: string;
  price: number;
  images: string[];
  size: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  color: {
    name: string;
    hex: string;
  };
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlanterSeries {
  _id: string;
  totalCount: string;
}

export interface IPlanterFilters {
  series?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  material?: string;
  color?: string;
}

export interface IPlantersResponse {
  data: IPlanter[];
  total: number;
  page: number;
  limit: number;
} 