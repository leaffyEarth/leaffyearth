// src/pots/dto/query-pots.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryPotsDto {
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
    description: 'Comma-separated list of fields to return',
    example: 'name,price,images',
    required: false,
  })
  @IsOptional()
  @IsString()
  fields?: string;

  @ApiProperty({
    description: 'Search term to filter planters by name',
    example: 'ceramic',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by planter category',
    example: 'Terracotta Planters',
    required: false,
  })
  @IsOptional()
  @IsString()
  planterCategory?: string;

  @ApiProperty({
    description: 'Filter by planter series',
    example: 'Spring Collection',
    required: false,
  })
  @IsOptional()
  @IsString()
  planterSeries?: string;

  @ApiProperty({
    description: 'Filter by size',
    example: 'medium',
    required: false,
  })
  @IsOptional()
  @IsString()
  size?: string;
}
