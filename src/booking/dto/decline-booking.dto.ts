import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeclineBookingDto {
  @IsNotEmpty()
  @IsString()
  description: any;

  @IsNotEmpty()
  @IsMongoId()
  bookingId: string;
}
