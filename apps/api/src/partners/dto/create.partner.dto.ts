// src/partners/dto/create-partner.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  location!: string; // Will store the location's ObjectId

  @IsString()
  @IsOptional()
  contactPerson?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
