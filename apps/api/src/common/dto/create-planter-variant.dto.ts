// create-planter-variant.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
import { sizeEnum } from '@leaffyearth/utils';

export class CreatePlanterVariantDto {

    @IsString()
    @IsNotEmpty()
    planterSku!: string;

    @IsEnum(sizeEnum, {
        message: `Size must be one of ${Object.values(sizeEnum).join(', ')}`,
    })
    size!: string;

    @IsString()
    @IsNotEmpty()
    color!: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    images?: string[];
}
