import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './interface/auth.interface';
import { ResponseHelper } from 'src/general/response.helper';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async loginUsers(@Body() login: Login) {
    const checkLogin = await this.authService.loginUsers(login);

    if (!checkLogin) return ResponseHelper.error('Invalid Email or Password');

    return ResponseHelper.success(checkLogin);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const forgotPassword = await this.authService.forgotPassword(email);
    return ResponseHelper.success(forgotPassword);
  }

  @Post('check-otp')
  async validationOtp(@Body('otpCode') otpCode: string, @Req() req) {
    const id = req?.user.id;
    console.log(id);
    const validationOtp = await this.authService.validationOtp(otpCode, id);
    return ResponseHelper.success(validationOtp);
  }

  @Post('change-password')
  async changePassword(@Body('newPassword') newPassword: string, @Req() req) {
    const id = req?.user.id;
    console.log(id);

    const changePassword = await this.authService.changePassword(
      newPassword,
      id,
    );

    if (!changePassword.success)
      return ResponseHelper.error(changePassword.message);

    return ResponseHelper.success(changePassword.message);
  }
}
