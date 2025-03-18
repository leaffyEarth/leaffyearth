// src/common/services/sku.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SkuService {

    generateSku(productType: string, productName: string, size?: string): string {
        const typePrefix = (productType || '').slice(0, 2).toUpperCase() || 'PD';
      
        const nameUpper = (productName || '').toUpperCase().replace(/\s+/g, '');
        const initials = nameUpper.slice(0, 2) || 'PN';
      
        const sizeCode = size 
          ? `-${size.substring(0, 3).toUpperCase()}`
          : '';
      
        const uniqueSuffix = uuidv4().split('-')[0].toUpperCase();
      
        return `${typePrefix}${initials}${sizeCode}-${uniqueSuffix}`;
      }
      

}
