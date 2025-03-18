// plants/dto/plant-family-query.dto.ts

import { IsOptional} from 'class-validator'

export class PlantFamilyQuery {
    @IsOptional()
    search?: string;
}
