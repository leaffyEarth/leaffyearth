// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateJwt(user: User): Promise<string> {
        const payload = { email: user.email, role: user.role };
        return this.jwtService.signAsync(payload);
    }

    async generateAppToken(): Promise<string> {
        const payload = { email: 'testuser@leaffyearth.com', role: 'manager' };
        return this.jwtService.signAsync(payload);
    }
}
