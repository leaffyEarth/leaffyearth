// plants/dto/query-users.dto.ts
import { IsOptional, IsNumberString, IsString } from 'class-validator'

export class QueryUsersDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  fields?: string;
}
