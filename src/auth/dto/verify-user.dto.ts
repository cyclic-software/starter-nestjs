import {
  IsMobilePhone,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class VerifyUserDto {
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
