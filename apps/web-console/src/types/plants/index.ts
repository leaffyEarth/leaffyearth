import {
  PlantIdealLocationTypeEnum,
  PlantLightExposureTypeEnum,
  PlantMaintenanceTypeEnum,
  PlantSizeEnum,
  PlantTagsTypeEnum,
  PlantTypeEnum,
  PlantWateringTypeEnum,
} from './enums'
import { IDimensions, IPlanterVariant } from './interfaces'

export interface IPlant {
  _id: string;
  name: string;
  plantSeries: string;
  images: string[];
  description: string;  
  thumbnail?: string;
  size: PlantSizeEnum;
  dimensions: IDimensions;
  price: number;
  type: PlantTypeEnum[];
  lightExposure: PlantLightExposureTypeEnum;
  idealLocation: PlantIdealLocationTypeEnum[];
  maintenance: PlantMaintenanceTypeEnum;
  watering: PlantWateringTypeEnum;
  tags: PlantTagsTypeEnum[];
  planterVariants: IPlanterVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface IPlantsResponse {
  data: IPlant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export * from "./interfaces"
export * from "./enums" 