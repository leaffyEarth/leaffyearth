import { PlanterCategoryEnum, PlanterSizeEnum } from './enums'

export interface IPlanterDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IPlanterColor {
  hex: string;
  name: string;
}

export interface ICreatePlanterDto {
  name?: string;
  planterCategory: PlanterCategoryEnum;
  planterSeries: string;
  description?: string;
  size: PlanterSizeEnum;
  dimensions: IPlanterDimensions;
  color: IPlanterColor;
  price: number;
}

export interface IPlanter {
  _id: string;
  name: string;
  planterCategory: PlanterCategoryEnum;
  planterSeries: string;
  description: string;
  size: PlanterSizeEnum;
  dimensions: IPlanterDimensions;
  color: IPlanterColor;
  price: number;
  images: string[];
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlantersResponse {
  data: IPlanter[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} 