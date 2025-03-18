// src/pots/dto/query-pots.dto.ts
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class QueryPotsDto {
  @IsOptional()
  @IsNumberString()
  page?: string;   // e.g., "1"

  @IsOptional()
  @IsNumberString()
  limit?: string;  // e.g., "10"

  @IsOptional()
  @IsString()
  fields?: string; // e.g., "name,color"
}
