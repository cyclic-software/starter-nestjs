import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Login, payloadToken, returnLogin } from './interface/auth.interface';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger: Logger;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async loginUsers(login: Login): Promise<returnLogin> {
    const user = await this.userService.findByEmail(login?.email);

    const checkData =
      user && bcrypt.compareSync(login?.password, user.password);
    if (!checkData) return null;

    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = await this.getRefreshToken(payload);
    const data = {
      id: user.id,
      email: login?.email,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
    return data;
  }

  async getRefreshToken(payload: payloadToken) {
    const { id } = payload;
    const { email } = payload;

    const expirationTimeInSeconds =
      Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours in seconds

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          data: email,
        },
        {
          secret: this.configService.getOrThrow(`JWT_SECRET`),
          expiresIn: expirationTimeInSeconds,
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          data: email,
        },
        {
          secret: this.configService.getOrThrow(`JWT_SECRET`),
          expiresIn: expirationTimeInSeconds,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(email: string) {
    const otpNumber = this.generateRandomNumber();
    const user = await this.userService.findByEmail(email);

    await this.userService.update(user.id, { otpCode: otpNumber.toString() });

    await this.emailService.sendForgotPassword({
      to: email,
      otp: otpNumber,
      name: user.name,
    });

    return {
      success: true,
      message: `Email Sending Successfully`,
    };
  }

  generateRandomNumber() {
    const minDigits = 100000;
    const maxDigits = 999999;

    const randomNumber =
      Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;
    return randomNumber;
  }

  async validationOtp(otpCode: string, id: number) {
    const users = await this.userService.findOne(id);
    const validOtp = users.otpCode === otpCode;
    if (!validOtp) throw new HttpException(`OTP Error`, HttpStatus.BAD_REQUEST);

    return {
      message: `OTP Success`,
    };
  }

  async changePassword(newPassword: string, id: number) {
    try {
      const users = await this.userService.findOne(id);
      users.password = await this.userService.hashPassword(newPassword);

      await this.userService.update(id, users);

      return {
        success: true,
        message: 'Updated Successfully',
      };
    } catch (error) {
      this.logger.error(`Error when change password ${error.message}`);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async decryptTokenHeadersJwt(token: string) {
    if (token === undefined) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      return payload;
    } catch (error) {
      this.logger.error(`Error when decrypt token JWT ${error.message}`);
      throw new UnauthorizedException();
    }
  }
}
