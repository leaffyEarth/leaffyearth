// plants/dto/plant-family-query.dto.ts

import { IsOptional } from 'class-validator';

export class PlanterFamilyQuery {
  @IsOptional()
  search?: string;
}
