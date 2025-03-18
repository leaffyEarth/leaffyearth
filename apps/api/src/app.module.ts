import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantsModule } from './plants/plants.module';
import { PlantersModule } from './pots/planter.module';
import { LocationsModule } from './locations/location.module';
import { PartnersModule } from './partners/partner.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { PaymentsModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PlantsModule,
    PlantersModule,
    LocationsModule,
    PartnersModule,
    AuthModule,
    UsersModule,
    PaymentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
