// src/common/services/sku.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { planterCategoryCodeEnum, sizeCodeEnum } from '@leaffyearth/utils';

@Injectable()
export class SkuService {
  generatePlantSku(
    productType: string,
    plantSeries: string,
    size: string,
  ): string {
    const typePrefix = (productType || '').slice(0, 2).toUpperCase() || 'PL';
    const plantSeriesCode = (plantSeries || '')
      .toUpperCase()
      .split(/\s+/)
      .map((word, index, arr) => (arr.length > 1 ? word[0] : word.slice(0, 2)))
      .join('');
      let sizeCode = 'SZ';
      if(size == 'small'){
        sizeCode = 'SM';
      }else if(size == 'medium'){
        sizeCode = 'MD';
      }else if(size == 'large'){
        sizeCode = 'LG';
      }else if(size == 'extra-large'){
        sizeCode = 'XL';
      } 
    const uniqueSuffix = uuidv4().split('-')[0].toUpperCase();

    return `${typePrefix}-${plantSeriesCode}-${sizeCode}-${uniqueSuffix}`;
  }

  generatePlanterSku(
    productType: string,
    planterSeries: string,
    planterCategory: string,
    size: string,
    colorHex: string,
  ): string {
    const typePrefix = (productType || '').toUpperCase() || 'PC';

    const seriesCode = (planterSeries || '')
      .toUpperCase()
      .split(/\s+/)
      .map((word, index, arr) => (arr.length > 1 ? word[0] : word.slice(0, 2)))
      .join('');
    const categoryCode =
      planterCategoryCodeEnum[
        planterCategory as keyof typeof planterCategoryCodeEnum
      ]?.toUpperCase() || 'PC';
    let sizeCode = 'SZ';
    if(size == 'small'){
      sizeCode = 'SM';
    }else if(size == 'medium'){
      sizeCode = 'MD';
    }else if(size == 'large'){
      sizeCode = 'LG';
    }else if(size == 'extra-large'){
      sizeCode = 'XL';
    } 
    const colorCode = (colorHex || '').replace('#', '').toUpperCase() || 'CL';
    const uniqueSuffix = uuidv4().split('-')[0].toUpperCase();

    return `${typePrefix}-${categoryCode}-${seriesCode}-${sizeCode}-${colorCode}-${uniqueSuffix}`;
  }
}
