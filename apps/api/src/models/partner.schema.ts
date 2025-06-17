// src/models/partner.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location.schema';

export type PartnerDocument = Partner & Document;

@Schema({ timestamps: true })
export class Partner {

  @Prop({ required: true })
  partnerId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  ownerName!: string;

  @Prop({ required: true })
  primaryPhoneNumber!: string;

  @Prop()
  secondaryPhoneNumber?: string;

  @Prop()
  email?: string;

  @Prop()
  region?: string;

  @Prop()
  address!: string; 

  @Prop({
    type: Types.ObjectId,
    ref: Location.name,
    required: true,
  })
  location!: Types.ObjectId;

  @Prop({ required: true })
  latitude!: number;

  @Prop({ required: true })
  longitude!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
