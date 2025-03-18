// src/partners/partners.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersController } from './partner.controller';
import { Partner, PartnerSchema } from '../models/partner.schema';
import { PartnersService } from './partner.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
    ],
      controllers: [PartnersController],
      providers: [PartnersService],
})
export class PartnersModule { }
