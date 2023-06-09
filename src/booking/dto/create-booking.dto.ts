import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { BOOKING_TYPE, PAYMENT_TYPE, VELET_TYPE } from '../booking.enum';

class CoordsDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: number;
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsEnum(BOOKING_TYPE)
  BookingType: BOOKING_TYPE;

  @IsInt()
  @Min(0)
  BookingAt: number | string;

  @ValidateNested()
  @Type(() => CoordsDto)
  @IsObject()
  startPoint: CoordsDto;

  @ValidateNested()
  @Type(() => CoordsDto)
  @IsObject()
  endPoint: CoordsDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CoordsDto)
  @IsArray()
  otherPoints: CoordsDto[];

  @IsOptional()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsEnum(VELET_TYPE)
  veletType: VELET_TYPE;

  @IsOptional()
  @IsMongoId({ message: 'Promotional code is not valid' })
  promotionalCode: string;

  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPE)
  paymentType: PAYMENT_TYPE;

  @IsOptional()
  @IsNumber()
  tip: string;
}
