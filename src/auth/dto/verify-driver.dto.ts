import { IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDriverDto {
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  phoneCode: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}
