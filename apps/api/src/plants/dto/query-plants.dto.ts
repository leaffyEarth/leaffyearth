// plants/dto/query-plants.dto.ts
import { IsOptional, IsNumberString, IsString, IsNumber, Min, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryPlantsDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  fields?: string;

  @IsOptional()
  @IsString()
  plantSeries?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsEnum(['price_asc', 'price_desc', 'rating', 'newest'])
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}
