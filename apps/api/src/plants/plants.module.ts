import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { ModelsModule } from '../models/models.module';
import { CommonModule } from '../common/common.module';
import { AzureBlobModule } from '../azure-blob/azure-blob.module';

@Module({
    imports: [
        ModelsModule,
        CommonModule,
        AzureBlobModule
    ],
    controllers: [PlantsController],
    providers: [PlantsService],
})
export class PlantsModule { }
