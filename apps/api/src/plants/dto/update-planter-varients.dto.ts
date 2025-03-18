import { OmitType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class UpdatePlanterVariantDto {
    @IsString()
    @IsNotEmpty()
    planterSku!: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) => (value === undefined ? [] : value))
    images?: string[];
}


export class PartialUpdatePlanterVariantDto extends OmitType(
    UpdatePlanterVariantDto,
    ['planterSku'] as const,
) { }