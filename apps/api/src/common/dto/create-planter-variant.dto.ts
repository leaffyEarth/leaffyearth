// create-planter-variant.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';
import { sizeEnum } from '@leaffyearth/utils';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanterVariantDto {
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  planterSku!: string;

  @IsEnum(sizeEnum, {
    message: `Size must be one of ${Object.values(sizeEnum).join(', ')}`,
  })
  size!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The color of the planter' })
  color!: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];
}
