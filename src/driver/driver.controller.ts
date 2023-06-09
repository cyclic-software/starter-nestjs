import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  updateUserProfile(@Body() updateUserDto: UpdateDriverDto, @Request() req) {
    const { user } = req;
    return this.driverService.updateDriverProfile(user, updateUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Request() req) {
    const { user } = req;
    return this.driverService.getUserProfile(user);
  }
}
