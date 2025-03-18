// update-plant.dto.ts

import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';

export class UpdatePlantDto extends PartialType(
    OmitType(CreatePlantDto, ['name'] as const),
) { }
