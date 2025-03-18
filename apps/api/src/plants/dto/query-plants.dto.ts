// plants/dto/query-plants.dto.ts
import { IsOptional, IsNumberString, IsString } from 'class-validator';

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

  // Add filter fields (all optional, all strings)
  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  lightExposure?: string;

  @IsOptional()
  @IsString()
  idealLocation?: string;

  @IsOptional()
  @IsString()
  maintenance?: string;

  @IsOptional()
  @IsString()
  watering?: string;

  @IsOptional()
  @IsString()
  tags?: string;
}
