// src/auth/auth.controller.ts
import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google.guard';
import { JwtAuthGuard } from './jwt.guard';
import { RequestWithUser } from 'src/common/types.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const user = req.user as any;  // from the GoogleStrategy validate()
        const jwt = await this.authService.generateJwt(user);

        res.cookie('token', jwt, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        return res.redirect(`${process.env.ADMIN_CONSOLE_URL}/auth_loading`);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: RequestWithUser) {
        return {
            email: req.user['email'],
            role: req.user['role']
        };
    }

    @Get('sample-bearer-token')
    async getSampleBearerToken() {
        const token = await this.authService.generateAppToken();
        return { token };
    }
}
