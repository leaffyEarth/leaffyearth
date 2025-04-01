import { IsString } from 'class-validator';

export class UpdatePlantImageDto {
  @IsString()
  images!: string;
}
