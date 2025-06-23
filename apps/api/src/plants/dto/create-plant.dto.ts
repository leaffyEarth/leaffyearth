import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionDto } from '../../common/dto/dimension.dto';
import {
  PlantIdealLocationType,
  PlantLightExporeType,
  PlantMaintenanceType,
  PlantTagsType,
  PlantType,
  PlantWateringType,
  sizeEnum,
} from '@leaffyearth/utils';
import { CreatePlanterVariantDto } from '../../common/dto/create-planter-variant.dto';

export class CreatePlantDto {
  @IsString()
  name!: string;

  @IsString()
  plantSeries!: string;

  @IsOptional()
  @IsString()
  thumbnail!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(sizeEnum, {
    message: `Size must be one of ${Object.values(sizeEnum).join(', ')}`,
  })
  size!: string;

  @ValidateNested()
  @Type(() => DimensionDto)
  dimensions!: DimensionDto;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsArray()
  @IsEnum(PlantType, {
    message: `Plant type must be from ${Object.values(PlantType).join(', ')}`,
    each: true,
  })
  type!: PlantType[];

  @IsOptional()
  @IsEnum(PlantLightExporeType, {
    message: `Plant lighting exposure must be one of ${Object.values(PlantLightExporeType).join(', ')}`,
  })
  lightExposure!: string;

  @IsOptional()
  @IsArray()
  @IsEnum(PlantIdealLocationType, {
    message: `Plant ideal location must be one of ${Object.values(PlantIdealLocationType).join(', ')}`,
    each: true,
  })
  idealLocation!: PlantIdealLocationType[];

  @IsOptional()
  @IsEnum(PlantMaintenanceType, {
    message: `Plant maintenance type must be one of ${Object.values(PlantMaintenanceType).join(', ')}`,
  })
  maintenance!: string;

  @IsOptional()
  @IsEnum(PlantWateringType, {
    message: `Plant watering type must be one of ${Object.values(PlantWateringType).join(', ')}`,
  })
  watering!: string;

  @IsOptional()
  @IsArray()
  @IsEnum(PlantTagsType, {
    message: `Plant tag must be one of ${Object.values(PlantWateringType).join(', ')}`,
    each: true,
  })
  tags?: PlantTagsType[];

  @IsOptional()
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreatePlanterVariantDto)
  planterVariant?: CreatePlanterVariantDto[];
}
