/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class ColorDto {
  @IsString()
  hex!: string;

  @IsString()
  name!: string;
}
