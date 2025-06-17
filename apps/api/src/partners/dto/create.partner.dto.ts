// src/partners/dto/create-partner.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Location } from 'src/models/location.schema';
export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  partnerId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  ownerName!: string;
  
  @IsString()
  @IsNotEmpty()
  primaryPhoneNumber!: string;

  @IsString()
  @IsOptional()
  secondaryPhoneNumber?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  region?: string;  

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  location!: Location;

  @IsNumber()
  @IsNotEmpty()
  latitude!: number;

  @IsNumber()
  @IsNotEmpty()
  longitude!: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;
}
