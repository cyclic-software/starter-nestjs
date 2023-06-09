import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import express, { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  updateUserProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const { user } = req;
    return this.userService.updateUserProfile(user, updateUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Request() req) {
    const { user } = req;
    return this.userService.getUserProfile(user);
  }
}
