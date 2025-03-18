// src/models/pot.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { sizeEnum } from '@leaffyearth/utils'

export type PotDocument = Pot & Document;

@Schema({ timestamps: true })
export class Pot {
    
    @Prop({ required: true })
    name!: string;         // e.g., "Ceramic Round Planter"

    @Prop({ default: '' })
    description!: string;  // A short description of the pot

    @Prop({
        required: true,
        enum: Object.values(sizeEnum),
    })
    size!: string;

    @Prop({
        type: {
            length: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
        },
        required: true,
    })
    dimensions!: {
        length: number;
        width: number;
        height: number;
    };

    @Prop({ required: true })
    color!: string;        // e.g., "red", "blue", "white"

    @Prop({ required: true })
    price!: number;        // Numeric price (in rs)

    @Prop({ required: true })
    images!: string[]; 

    @Prop({ required: true, unique: true })
    sku!: string;          // Unique identifier for this specific pot variant
}

export const PotSchema = SchemaFactory.createForClass(Pot);
