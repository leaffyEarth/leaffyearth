// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { roleEnum } from '@leaffyearth/utils'

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Invalid email address',
        },
    })
    email!: string;

    @Prop()
    displayName?: string;

    @Prop({
        type: String,
        enum: roleEnum,
        default: roleEnum.MANAGER,  // The most limited role by default
    })
    role!: roleEnum;

}

export const UserSchema = SchemaFactory.createForClass(User);
