// plants-planter-variants.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Pot } from './pot.schema';

export type PlantsPlanterVariantsDocument = PlantsPlanterVariants & Document;

@Schema()
export class PlantsPlanterVariants {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Pot',
        required: true
    })
    planter!: Types.ObjectId;

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

// Add index for better query performance
PlantsPlanterVariantsSchema.index({ planter: 1 });
