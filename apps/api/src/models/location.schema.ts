// src/models/location.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true, unique: true })
  name!: string; 

  @Prop({ required: true, unique: true })
  pincodes!: string[];

  @Prop()
  description?: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
