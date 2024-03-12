import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    singIn(@Body() logindata) {
        return this.authService.singIn(logindata.username, logindata.password);
    }

    @UseGuards(AuthGuard, RolesGuard)        
    @Roles([Role.CLIENT, Role.ADMIN, Role.GOD])
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }


}
