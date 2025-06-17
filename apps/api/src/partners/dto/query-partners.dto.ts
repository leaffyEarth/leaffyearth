import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryPartnersDto {
  @ApiProperty({
    description: 'Page number',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiProperty({
    description: 'Number of items per page',
    example: '10',
    required: false,
  })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiProperty({
    description: 'Search term to filter partners by name or address',
    example: 'Bengaluru',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by location',
    example: 'Bengaluru, Karnataka',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Filter by active status',
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Filter by contact person',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  contactPerson?: string;
} 