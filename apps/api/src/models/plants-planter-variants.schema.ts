// plants-planter-variants.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantsPlanterVariantsDocument = PlantsPlanterVariants & Document;

@Schema()
export class PlantsPlanterVariants {

    @Prop({
        type: String,
        required: true,
        // unique: true,
        sparse: true, // Allow multiple null values
    })
    planterSku!: string | null;

    @Prop({
        type: [String],
        default: [],
        validate: {
            validator: function (v: string[]) {
                return Array.isArray(v);
            },
            message: 'Images must be an array of strings.'
        }
    })

    images!: string[];
}

export const PlantsPlanterVariantsSchema = SchemaFactory.createForClass(PlantsPlanterVariants);
