import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PROMOTIONAL_TYPE } from '../promotional.enum';

export class CreatePromotionalDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  termsAndCondition: string;

  @IsOptional()
  @IsEnum(PROMOTIONAL_TYPE)
  type: PROMOTIONAL_TYPE;

  @IsNotEmpty()
  @IsDateString()
  expiredAt: Date;
}
