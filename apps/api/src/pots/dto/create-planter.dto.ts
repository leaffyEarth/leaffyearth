// src/pots/dto/create-pot.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
  // Matches,
} from 'class-validator';
import { sizeEnum } from '@leaffyearth/utils';
import { DimensionDto } from '../../common/dto/dimension.dto';
import { Type } from 'class-transformer';
import { ColorDto } from '../../common/dto/color.dto';
import { ApiProperty } from '@nestjs/swagger';
import { planterCategoryEnum } from '@leaffyearth/utils';

export class CreatePotDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the pot',
    example: 'Terracotta Planter',
  })
  name!: string;

  @IsEnum(planterCategoryEnum, {
    message: `Planter Category must be one of ${Object.values(planterCategoryEnum).join(', ')}`,
  })
  @ApiProperty({
    description: 'Planter Category',
    example: 'Terracotta Planters',
  })
  planterCategory!: planterCategoryEnum;

  @IsString()
  @ApiProperty({ description: 'Planter Series', example: 'spring' })
  planterSeries!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the pot',
    example: 'A beautiful pot',
  })
  description!: string;

  @IsEnum(sizeEnum, {
    message: `Size must be one of ${Object.values(sizeEnum).join(', ')}`,
  })
  @ApiProperty({ description: 'Size of the pot', example: 'small' })
  size!: sizeEnum;

  @ValidateNested()
  @Type(() => DimensionDto)
  @ApiProperty({ type: DimensionDto })
  dimensions!: DimensionDto;

  @ValidateNested()
  @Type(() => ColorDto)
  @ApiProperty({
    description: 'Color information for the planter variant',
    type: ColorDto,
  })
  color!: ColorDto;

  @IsNumber()
  price!: number;
}
