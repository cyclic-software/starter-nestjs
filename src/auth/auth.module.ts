import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local.strategy';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [
    UserModule,
    DriverModule,
    JwtModule.register({
      global: true,
      secret: ConfigService.keys.JWT_SECRET,
      // signOptions: { expiresIn: '6s' },
      signOptions: { expiresIn: '2628002s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
