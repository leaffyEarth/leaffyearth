// src/users/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { roleEnum } from '@leaffyearth/utils';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(roleEnum)
  @IsOptional()
  role?: roleEnum;  // might default to Role.MANAGER if not provided

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dob!: Date;

  @IsEnum(['male', 'female', 'other'])
  @IsNotEmpty()
  gender!: string;

}
