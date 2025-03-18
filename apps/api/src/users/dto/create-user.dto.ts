// src/users/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { roleEnum } from '@leaffyearth/utils';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEnum(roleEnum)
  @IsOptional()
  role?: roleEnum;  // might default to Role.MANAGER if not provided
}
