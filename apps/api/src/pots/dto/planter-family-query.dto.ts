// plants/dto/plant-family-query.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class PlanterFamilyQuery {
  @IsOptional()
  @IsString()
  search?: string;
}
