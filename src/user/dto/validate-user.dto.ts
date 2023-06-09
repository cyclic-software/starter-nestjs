import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
