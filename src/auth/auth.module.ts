import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/constants';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions:{ expiresIn: '3600s'}
        })
    ],
    exports: [
        AuthService
    ],
    providers: [AuthService],
    controllers: [AuthController],

})
export class AuthModule { }
