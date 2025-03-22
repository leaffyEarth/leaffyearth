// src/common/services/sku.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plantCategoryEnum, planterCategoryCodeEnum } from '@leaffyearth/utils'

@Injectable()
export class SkuService {

  generatePlantSku(productType: string, productName: string, size?: string): string {
    const typePrefix = (productType || '').slice(0, 2).toUpperCase() || 'PD';

    const nameUpper = (productName || '').toUpperCase().replace(/\s+/g, '');
    const initials = nameUpper.slice(0, 2) || 'PN';

    const sizeCode = size
      ? `-${size.substring(0, 3).toUpperCase()}`
      : '';

    const uniqueSuffix = uuidv4().split('-')[0].toUpperCase();

    return `${typePrefix}${initials}${sizeCode}-${uniqueSuffix}`;
  }

  generatePlanterSku(
    planterSeries: string,
    planterCategory: string,
    size: string,
    colorName: string
  ): string {
    const typePrefix = 'PT';

    const seriesCode = (planterSeries).slice(0, 2).toUpperCase() || 'PS';
    const categoryCode = planterCategoryCodeEnum[planterCategory as keyof typeof planterCategoryCodeEnum]?.toUpperCase() || 'PC';
    const sizeCode = (size || '').toUpperCase() || 'SZ';
    const colorCode = (colorName || '').toUpperCase() || 'CL';

    const uniqueSuffix = uuidv4().split('-')[0].toUpperCase();

    console.log(`${typePrefix}${seriesCode}${categoryCode}-${sizeCode}${colorCode}-${uniqueSuffix}`);

    return `${typePrefix}${seriesCode}${categoryCode}-${sizeCode}${colorCode}-${uniqueSuffix}`;
  }


}
