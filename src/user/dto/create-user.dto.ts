import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;
}
