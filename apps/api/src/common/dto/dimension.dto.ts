// src/common/dto/dimension.dto.ts
import { IsNumber, Min } from 'class-validator';

export class DimensionDto {
  @IsNumber()
  @Min(0)
  length!: number;

  @IsNumber()
  @Min(0)
  width!: number;

  @IsNumber()
  @Min(0)
  height!: number;
}
