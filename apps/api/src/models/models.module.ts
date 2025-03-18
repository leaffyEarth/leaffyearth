import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './plant.schema';
import { Pot, PotSchema } from './pot.schema';
import { Location, LocationSchema } from './location.schema';
import { Partner, PartnerSchema } from './partner.schema';
import { User, UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Plant.name, schema: PlantSchema },
            { name: Pot.name, schema: PotSchema },
            { name: Location.name, schema: LocationSchema },
            { name: Partner.name, schema: PartnerSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class ModelsModule  { }
