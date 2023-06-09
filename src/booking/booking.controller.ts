import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { BookingService } from './booking.service';
import { AssignBookingDto } from './dto/assign-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DeclineBookingDto } from './dto/decline-booking.dto';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get('user')
  getUserBookings(
    @Request() req,
    @Query('status') status,
    @Query('page') page,
    @Query('limit') limit,
  ) {
    return this.bookingService.getUserBookings({
      user: req.user,
      status,
      page,
      limit,
    });
  }

  @Get('user/cancel')
  cancelBooking(@Request() req, @Query('bookingId') bookingId: string) {
    return this.bookingService.cancelBooking(req.user, bookingId);
  }

  @Get('user/:bookingId')
  getOneUserBookings(@Request() req, @Param('bookingId') bookingId: string) {
    return this.bookingService.getOneUserBooking(req.user, bookingId);
  }

  @Get('driver')
  getDriverBookings(
    @Request() req,
    @Query('status') status,
    @Query('bookingType') bookingType,
    @Query('page') page,
    @Query('limit') limit,
  ) {
    return this.bookingService.getDriverBookings({
      user: req.user,
      status,
      bookingType,
      page,
      limit,
    });
  }

  @Get('driver/:bookingId')
  getOneDriverBookings(@Request() req, @Param('bookingId') bookingId: string) {
    return this.bookingService.getOneDriverBookings(req.user, bookingId);
  }

  @Get('driver/booking-issue')
  bookingUserIssue(@Request() req, @Query('bookingId') bookingId: string) {
    return this.bookingService.bookingUserIssue(req.user, bookingId);
  }

  // !----------- Status handler APIS -------------------!

  @Get('driver/status/complete')
  completeBooking(@Request() req, @Query('bookingId') bookingId: string) {
    return this.bookingService.completeBooking(req.user, bookingId);
  }

  @Get('driver/status/accept')
  acceptBooking(@Request() req, @Query('bookingId') bookingId: string) {
    return this.bookingService.acceptBooking(req.user, bookingId);
  }

  @Get('driver/status/start')
  startBooking(@Request() req, @Query('bookingId') bookingId: string) {
    return this.bookingService.startBooking(req.user, bookingId);
  }

  @Post('driver/status/decline')
  declineBooking(@Request() req, @Body() declineBookingDto: DeclineBookingDto) {
    return this.bookingService.declineBooking(req.user, declineBookingDto);
  }

  @Post('admin/status/assign-booking')
  assignBooking(@Body() assignBookingDto: AssignBookingDto) {
    return this.bookingService.assignBooking(assignBookingDto);
  }
}
