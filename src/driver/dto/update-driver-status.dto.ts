import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { status } from '../driver.enum';

export class UpdateDriverStatusDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(status)
  @IsNotEmpty()
  status: string;
}
