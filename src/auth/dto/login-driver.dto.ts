import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginDriverDto {
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  phoneCode: string;
}
