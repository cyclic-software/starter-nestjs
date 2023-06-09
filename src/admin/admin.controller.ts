import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import express, { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateDriverStatusDto } from 'src/driver/dto/update-driver-status.dto';
import { LoginGuard } from './login.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('page/login.hbs')
  root(@Query('error') query) {
    const error = query;
    return { message: 'login', error };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Body() loginDto: LoginDto, @Request() req, @Res() res: Response): any {
    res.redirect('/admin/users');
    return { User: req.user, msg: 'User logged in' };
    // return this.adminService.afterLogin(res, req, loginDto);
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('protected')
  protected(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  @Post('/user_login')
  login2(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.adminService.login(loginDto, res);
  }

  @Post('/signup')
  create(@Body() signupDto: SignupDto) {
    return this.adminService.registerAdmin(signupDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/users')
  @Render('page/customers/index.hbs')
  root2(@Request() req) {
    console.log('req', req.route.path);
    return this.adminService.allUsers(req);
    // .then((result) => (result ? { users: result } : { users: [] }));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/drivers/pending')
  @Render('page/partners/pending/index.hbs')
  root4(@Request() req, @Query() query) {
    return this.adminService.allDrivers(req, query);
    // .then((result) => (result ? { users: result } : { users: [] }));
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/driver/status/update')
  updateDriverStatus(@Body() updateDriverStatusDto: UpdateDriverStatusDto) {
    return this.adminService.driverStatus(updateDriverStatusDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/terms-conditions')
  @Render('page/terms_condition.hbs')
  root3(@Res() res: Response) {
    console.log();
  }

  @Get('/drivers/list')
  // @Render('page/partners/pending/index.hbs')
  driverList(@Request() req, @Query() query) {
    return this.adminService.driverFilter(req, query);
    // .then((result) => (result ? { users: result } : { users: [] }));
  }
}
