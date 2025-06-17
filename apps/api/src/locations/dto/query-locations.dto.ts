import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryLocationsDto {
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
    description: 'Search term to filter locations by name',
    example: 'Bengaluru',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by pincode',
    example: '560083',
    required: false,
  })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiProperty({
    description: 'Filter by multiple pincodes',
    example: ['560083', '560084'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pincodes?: string[];
} 