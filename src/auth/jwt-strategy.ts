import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private driverService: DriverService,
  ) {
    super({
      usernameField: 'phoneNumber',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ConfigService.keys.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      let user;
      if (payload.type === 'user') {
        user = await this.userService.getOneUser({
          _id: payload.sub,
        });
      } else {
        user = await this.driverService.getOneDriver({
          _id: payload.sub,
        });
      }
      if (!user) {
        throw new HttpException("User doesn't exist", HttpStatus.UNAUTHORIZED);
      }
      if (!user.sessions.includes(payload.sessionId)) {
        throw new HttpException(
          'not a valid Session, Please logIn again!',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (error) {
      console.error('Error in validate');
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
