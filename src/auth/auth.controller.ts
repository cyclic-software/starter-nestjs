import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { VerifyDriverDto } from './dto/verify-driver.dto';
import { LoginDriverDto } from './dto/login-driver.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // !--------------- User -------------------!

  @Post('user')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('user/verify')
  async verifyUserOtp(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
  }

  @Post('user/resend-otp')
  async resendUserOtp(@Body() loginUserDto: LoginUserDto) {
    return this.authService.resendUserOtp(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/logout')
  async logoutUser(@Headers() headers, @Request() req) {
    const { user } = req;
    const { authorization } = headers;
    const token = authorization.substring(7, authorization.length);
    return await this.authService.logoutUser(user, token);
  }

  // !--------------- Driver -------------------!

  @Post('driver')
  async loginDriver(@Body() loginDriverDto: LoginUserDto) {
    return this.authService.loginDriver(loginDriverDto);
  }

  @Post('driver/verify')
  async verifyDriverOtp(@Body() verifyDriverDto: VerifyDriverDto) {
    return this.authService.verifyDriver(verifyDriverDto);
  }

  @Post('driver/resend-otp')
  async resendDriverOtp(@Body() loginDriverDto: LoginDriverDto) {
    return this.authService.resendDriverOtp(loginDriverDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('driver/logout')
  async logoutDriver(@Headers() headers, @Request() req) {
    const { user } = req;
    const { authorization } = headers;
    const token = authorization.substring(7, authorization.length);
    return await this.authService.logoutUser(user, token);
  }
}
