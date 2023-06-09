import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  phoneCode: string;
}
