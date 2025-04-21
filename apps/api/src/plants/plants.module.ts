import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { Plant, PlantSchema } from '../models/plant.schema';
import { Pot, PotSchema } from '../models/pot.schema';
import { SkuService } from '../common/services/sku.service';
import { AzureBlobModule } from '../azure-blob/azure-blob.module';
import { PlantersModule } from '../pots/planter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plant.name, schema: PlantSchema },
      { name: Pot.name, schema: PotSchema }
    ]),
    AzureBlobModule,
    PlantersModule
  ],
  controllers: [PlantsController],
  providers: [PlantsService, SkuService],
  exports: [PlantsService],
})
export class PlantsModule {}
