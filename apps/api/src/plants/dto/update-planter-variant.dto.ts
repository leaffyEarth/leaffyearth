import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PartialUpdatePlanterVariantDto {
    @ApiProperty({
      description: 'Array of image URLs for this variant',
      example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      required: false
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
  } 

  
export class UpdatePlanterVariantDto {
  @ApiProperty({
    description: 'The ID of the planter to associate with this variant',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  planter!: string;

  @ApiProperty({
    description: 'Array of image URLs for this variant',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
} 