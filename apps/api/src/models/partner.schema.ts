// src/models/partner.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location.schema';

export type PartnerDocument = Partner & Document;

@Schema({ timestamps: true })
export class Partner {
    
  @Prop({ required: true })
  name!: string;

  @Prop()
  address!: string; 
  // e.g. "123 MG Road, near XYZ landmark"

  @Prop({
    type: Types.ObjectId,
    ref: Location.name,
    required: true,
  })
  location!: Types.ObjectId;
  // Points to the minimal location record

  @Prop()
  contactPerson?: string;

  @Prop()
  contactPhone?: string;

  @Prop()
  email?: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
