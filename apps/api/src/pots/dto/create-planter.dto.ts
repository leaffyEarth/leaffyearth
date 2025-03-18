// src/pots/dto/create-pot.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { sizeEnum } from '@leaffyearth/utils';
import { DimensionDto } from '../../common/dto/dimension.dto';
import { Type } from 'class-transformer';

export class CreatePotDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsEnum(sizeEnum, {
    message: `Size must be one of ${Object.values(sizeEnum).join(', ')}`,
  })
  size!: sizeEnum;

  @ValidateNested()
  @Type(() => DimensionDto)
  dimensions!: DimensionDto;

  @IsString()
  color!: string;

  @IsNumber()
  price!: number;
}
