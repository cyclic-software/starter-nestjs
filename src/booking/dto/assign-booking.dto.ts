import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AssignBookingDto {
  @IsNotEmpty()
  @IsMongoId()
  driverId: any;

  @IsNotEmpty()
  @IsMongoId()
  bookingId: string;
}
