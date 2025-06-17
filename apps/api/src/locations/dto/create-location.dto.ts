// src/locations/dto/create-location.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  pincodes!: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
