// src/locations/locations.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../models/location.schema';
import { LocationsService } from './location.service';
import { LocationsController } from './location.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService], 
})
export class LocationsModule {}
