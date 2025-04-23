import {
  PlantSizeEnum,
  PlantTypeEnum,
  PlantLightExposureTypeEnum,
  PlantIdealLocationTypeEnum,
  PlantMaintenanceTypeEnum,
  PlantWateringTypeEnum,
  PlantTagsTypeEnum,
} from './enums'

export interface IDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IPlanterVariant {
  id: string;
  planter: string;
  images: string[];
}

export interface ICreatePlantDto {
  name: string;
  plantSeries: string;
  thumbnail?: string;
  description?: string;
  size: PlantSizeEnum;
  dimensions: IDimensions;
  price: number;
  type?: PlantTypeEnum[];
  lightExposure?: PlantLightExposureTypeEnum;
  idealLocation?: PlantIdealLocationTypeEnum[];
  maintenance?: PlantMaintenanceTypeEnum;
  watering?: PlantWateringTypeEnum;
  tags?: PlantTagsTypeEnum[];
  planterVariant?: IPlanterVariant[];
}

export interface IPlant {
  _id: string
  name: string
  plantSeries: string
  thumbnail: string
  images: string[]
  description: string
  size: PlantSizeEnum
  dimensions: IDimensions
  price: number
  type: PlantTypeEnum[]
  lightExposure: PlantLightExposureTypeEnum
  idealLocation: PlantIdealLocationTypeEnum[]
  maintenanceType: PlantMaintenanceTypeEnum
  wateringType: PlantWateringTypeEnum
  tags: PlantTagsTypeEnum[]
  planterVariants: IPlanterVariant[]
  createdAt: string
  updatedAt: string
} 