// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@leaffyearth/utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the custom decorator (metadata)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    // Extract user from the request
    const { user } = context.switchToHttp().getRequest();

    // If no user, deny
    if (!user) {
      return false;
    }

    // Check if the user’s role is one of the required roles
    return requiredRoles.includes(user.role);
  }
}
