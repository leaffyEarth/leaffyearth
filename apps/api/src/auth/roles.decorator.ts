// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '@leaffyearth/utils';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
