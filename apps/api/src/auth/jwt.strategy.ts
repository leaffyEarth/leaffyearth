// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { RequestWithCookies } from 'src/common/types.interface';
import { UsersService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => {
          const token = (req?.headers as any)?.authorization?.startsWith('Bearer ') 
            ? (req?.headers as any)?.authorization?.substring(7) 
            : req?.cookies?.token || null;
          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Fallback to Authorization header
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      // Fetch the user from the database using email
      const user = await this.usersService.findOneByEmail(payload.email);      
      // Return the user data with the role from the database
      return { 
        email: user.email, 
        role: user.role,
        id: (user as any).id // Use id property which is available on Mongoose documents
      };
    } catch (error) {
      console.error('Error fetching user from database:', error);
      // Fallback to payload data if database fetch fails
      return { email: payload.email, role: payload.role };
    }
  }
}
