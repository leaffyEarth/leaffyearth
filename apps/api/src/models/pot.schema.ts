// src/models/pot.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { planterCategoryEnum, sizeEnum } from '@leaffyearth/utils';
import { PlantsPlanterVariants } from './plants-planter-variants.schema';
import { Plant } from './plant.schema';

export type PotDocument = Pot & Document;

@Schema({ timestamps: true })
export class Pot {
    @Prop({ required: true })
    name!: string;          // e.g.,

    @Prop({ required: true, enum: Object.values(planterCategoryEnum) })
    planterCategory!: string;         // e.g., "Terracotta Planters/Ceramic Planters"

    @Prop({ required: true })
    planterSeries!: string;           // e.g., spring Planter and zig zag Planter for Terracotta Planters"

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

    @Prop({
        type: {
            hex: { type: String, required: true },
            name: { type: String, required: true },
        },
        required: true
    })
    color!: {
        hex: string;
        name: string;
    }       // e.g., { hex: '#964B00', name: 'brown' }

    @Prop({ required: true })
    price!: number;        // Numeric price (in rs)

    @Prop({ required: true })
    images!: string[];

    @Prop({ required: true, unique: true })
    sku!: string;          // Unique identifier for this specific pot variant
}

export const PotSchema = SchemaFactory.createForClass(Pot);

// Add middleware to handle cascading deletes
PotSchema.pre('deleteOne', { document: true, query: false }, async function(this: PotDocument, next: (err?: Error) => void) {
    try {
        // Get the models
        const PlantsPlanterVariantsModel = this.model(PlantsPlanterVariants.name);
        const PlantModel = this.model(Plant.name);
        
        // Delete all variants that reference this pot
        await PlantsPlanterVariantsModel.deleteMany({ planter: this._id });
        
        // Update all plants that have this pot in their planterVariants array
        await PlantModel.updateMany(
            { 'planterVariants.planter': this._id },
            { $pull: { planterVariants: { planter: this._id } } }
        );
        
        next();
    } catch (error) {
        next(error as Error);
    }
});
