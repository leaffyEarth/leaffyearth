// plants/dto/query-plants.dto.ts
import { IsOptional, IsNumberString } from 'class-validator'

export class PlantsCatalogQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
