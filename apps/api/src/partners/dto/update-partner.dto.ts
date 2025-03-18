// src/partners/dto/update-partner.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from './create.partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
