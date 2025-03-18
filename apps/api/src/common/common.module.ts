// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { SkuService } from './services/sku.service';

@Module({
    providers: [SkuService],
    exports: [SkuService], 
})
export class CommonModule { }
