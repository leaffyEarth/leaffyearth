import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlantIdealLocationType, PlantLightExporeType, PlantMaintenanceType, PlantTagsType, PlantType, PlantWateringType, sizeEnum } from '@leaffyearth/utils';
import { PlantsPlanterVariants, PlantsPlanterVariantsSchema } from './plants-planter-variants.schema';

export type PlantDocument = Plant & Document;

@Schema({ timestamps: true })
export class Plant {

    // should be always in lower letters
    @Prop({ required: true })
    name!: string;

    // should be always in lower letters
    @Prop({ required: true })
    plantSeries!: string;

    @Prop({ default: '' })
    description!: string;

    @Prop({
        required: true,
        enum: Object.values(sizeEnum),
    })
    size!: string;


    // filters
    // should be a array
    @Prop({
        enum: Object.values(PlantType),
    })
    type!: string;

    @Prop({
        enum: Object.values(PlantLightExporeType),
    })
    lightExposure!: string;

    // should be a array
    @Prop({
        enum: Object.values(PlantIdealLocationType),
    })
    idealLocation!: string;

    @Prop({
        enum: Object.values(PlantMaintenanceType),
    })
    maintenance!: string;

    @Prop({
        enum: Object.values(PlantWateringType),
    })
    watering!: string;

    @Prop({
        type: [String],
        enum: Object.values(PlantTagsType),
        default: [],
    })
    tags!: PlantTagsType[];

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

    @Prop()
    images!: string[];

    @Prop()
    thumbnail!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true, unique: true })
    sku!: string;

    @Prop({type: [PlantsPlanterVariantsSchema], default: []})
    planterVariants!: PlantsPlanterVariants[]

}

export const PlantSchema = SchemaFactory.createForClass(Plant);

PlantSchema.pre('save', function (next) {
    // `this` refers to the document being saved
    if (this.isModified('name')) {
        this.name = this.name.toLowerCase().trim().replace(/\s+/g, ' ');
    }
    if (this.isModified('plantSeries')) {
        this.plantSeries = this.plantSeries.toLowerCase().trim().replace(/\s+/g, ' ');
    }
    next();
});
