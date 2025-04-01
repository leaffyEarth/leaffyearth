// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { GoogleAuthGuard } from './google.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UsersModule } from 'src/users/user.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtBearerStrategy } from './jwt-bearer.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    RolesGuard,
    Reflector,
    JwtStrategy,
    JwtBearerStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, GoogleAuthGuard, RolesGuard],
})
export class AuthModule {}
