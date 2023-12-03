export class CreateUserDto {
  name: string;
  password: string;
  phone: string;
  nik: string;
  email: string;
  address: string;
  position: string;
  otpCode?: string;
  path?: string;
  filename?: string;
  mimetype?: string;
}
