// src/auth/google.strategy.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,  // e.g. http://localhost:3000/auth/google/callback
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        // Extract user info from Google profile
        const { name, emails } = profile;
        const email = emails[0].value;

        const existingUser = await this.usersService.findOneByEmail(email);
        
        if (!existingUser) {
            return done(new UnauthorizedException('User not in the system'), false);
        }

        return done(null, existingUser);
    }
}
