// src/auth/firebase/firebase-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { FirebaseAdminService } from './firebase-admin.service';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebaseAdmin: FirebaseAdminService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req: Request = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
  
      if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing Firebase ID token');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const decodedToken = await this.firebaseAdmin.verifyToken(token);
        (req as any).user = decodedToken;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  