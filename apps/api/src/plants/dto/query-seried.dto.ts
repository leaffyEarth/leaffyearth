// plants/dto/plant-family-query.dto.ts

import { IsOptional } from 'class-validator'

export class QuerySeriedDto {
    @IsOptional()
    size?: "small" | "medium" | "large" | "extra-large";
}
