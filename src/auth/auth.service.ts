import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly driverService: DriverService,
    private jwtService: JwtService,
  ) {}

  // !--------------- User -------------------!

  async loginUser(signInDto: LoginUserDto) {
    try {
      const otp = await this.userService.assignOtp(signInDto);
      return {
        message: 'Otp send successfully on this number',
        data: { otp },
      };
    } catch (error) {
      console.error('Error in loginUser', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser(dto: VerifyUserDto) {
    try {
      const isMatched = await this.userService.validateUser(dto);
      if (isMatched) {
        const user = await this.userService.getLoginUser({
          phoneNumber: dto.phoneNumber,
          phoneCode: dto.phoneCode,
        });
        const payload = {
          sub: user?._id,
          sessionId: uuidv4(),
          type: 'user',
        };
        const access_token = this.jwtService.sign(payload);
        user.sessions.push(payload.sessionId);
        await user.save();
        user.sessions = undefined;
        return {
          message: 'Otp verified successfully.',
          data: { access_token, user },
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      console.error('Error in loginUser', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resendUserOtp(dto: LoginUserDto) {
    await this.userService.resendOtp(dto);
    return {
      message: 'Otp sent successfully',
      data: null,
    };
  }

  async logoutUser(user, token) {
    try {
      const payload = this.jwtService.verify(token);
      const index = user.sessions.indexOf(payload.sessionId);
      user.sessions.splice(index, 1);
      await user.save();
      return { message: 'successfully logged out', data: null };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  // !--------------- Driver -------------------!

  async loginDriver(signInDto: LoginUserDto) {
    try {
      const otp = await this.driverService.assignOtp(signInDto);
      return {
        message: 'Otp send successfully on this number',
        data: { otp },
      };
    } catch (error) {
      console.error('Error in loginUser', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyDriver(dto: VerifyUserDto) {
    try {
      const isMatched = await this.driverService.validateDriver(dto);
      if (isMatched) {
        const user = await this.driverService.getLoginDriver({
          phoneNumber: dto.phoneNumber,
          phoneCode: dto.phoneCode,
        });
        const payload = {
          sub: user?._id,
          sessionId: uuidv4(),
          type: 'driver',
        };
        const access_token = this.jwtService.sign(payload);
        user.sessions.push(payload.sessionId);
        await user.save();
        user.sessions = undefined;
        return {
          message: 'Otp verified successfully',
          data: { access_token, user },
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      console.error('Error in loginUser', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resendDriverOtp(dto: LoginUserDto) {
    await this.driverService.resendOtp(dto);
    return {
      message: 'Otp sent successfully',
      data: null,
    };
  }

  async logoutDriver(user, token) {
    try {
      const payload = this.jwtService.verify(token);
      const index = user.sessions.indexOf(payload.sessionId);
      user.sessions.splice(index, 1);
      await user.save();
      return { message: 'successfully logged out', data: null };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
