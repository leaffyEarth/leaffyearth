// src/locations/dto/create-location.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;
}
