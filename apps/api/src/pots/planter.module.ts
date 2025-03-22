// src/pots/pots.module.ts
import { Module } from '@nestjs/common';
import { PlantersController } from './planter.controller';
import { PlanterService } from './planter.service';
import { ModelsModule } from '../models/models.module';
import { CommonModule } from '../common/common.module'; // if you have a shared SkuService, etc.
import { AzureBlobModule } from '../azure-blob/azure-blob.module';

@Module({
  imports: [
    ModelsModule,
    CommonModule,
    AzureBlobModule
  ],
  controllers: [PlantersController],
  providers: [PlanterService],
  exports: [PlanterService],
})
export class PlantersModule { }
