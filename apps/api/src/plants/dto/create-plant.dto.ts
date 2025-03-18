import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionDto } from '../../common/dto/dimension.dto';
import { PlantIdealLocationType, PlantLightExporeType, PlantMaintenanceType, PlantTagsType, PlantType, PlantWateringType, sizeEnum } from '@leaffyearth/utils';
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
    @IsEnum(PlantType, {
        message: `Plant type must be one of ${Object.values(PlantType).join(', ')}`,
    })
    type!: string;

    @IsOptional()
    @IsEnum(PlantLightExporeType, {
        message: `Plant lighting exposure must be one of ${Object.values(PlantLightExporeType).join(', ')}`,
    })
    lightExposure!: string;

    @IsOptional()
    @IsEnum(PlantIdealLocationType, {
        message: `Plant ideal location must be one of ${Object.values(PlantIdealLocationType).join(', ')}`,
    })
    idealLocation!: string;

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
        each: true
    })
    tags?: PlantTagsType[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlanterVariantDto)
    planterVariant?: CreatePlanterVariantDto[];
}
