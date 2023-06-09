import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingDocument, BookingModel } from './schema/booking.schema';
import { PromotionalService } from 'src/promotional/promotional.service';
import { AssignBookingDto } from './dto/assign-booking.dto';
import { BOOKING_STATUS, BOOKING_TYPE } from './booking.enum';
import * as mongoose from 'mongoose';
import { AreaSettingsService } from 'src/area-settings/area-settings.service';
import {
  BookingStatusDocument,
  BookingStatusModel,
} from './schema/bookingStatus.schema';
import { DeclineBookingDto } from './dto/decline-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookingModel.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(BookingStatusModel.name)
    private readonly bookingStatusModel: Model<BookingStatusDocument>,
    private readonly promotionalServices: PromotionalService,
    private readonly areaSettingsService: AreaSettingsService,
  ) {}

  async create(createBookingDto: CreateBookingDto, user) {
    try {
      if (!user?.isProfileCompleted) {
        throw new HttpException(
          'Please complete your profile first to request a booking',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const newDoc = createBookingDto;
      newDoc['createdBy'] = user._id;
      if (createBookingDto.BookingType === 'NOW') {
        newDoc.BookingAt = moment().unix();
      }

      let totalAmount = 0;
      if (newDoc.promotionalCode) {
        const { data } = await this.promotionalServices.verifyPromotional({
          _id: newDoc.promotionalCode,
        });
        if (!data) {
          throw new HttpException(
            '*Code has expired / Code is invalid',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
        newDoc['promotional'] = {
          promotionalCode: data.promotional.code,
          promotionalAmount: data.promotional.amount,
          promotionalType: data.promotional.type,
        };
        totalAmount -= data.promotional.amount;
      }

      newDoc['BookingId'] = moment().unix();
      const otherAmounts = await this.getBookingAmount(newDoc);
      newDoc['amount'] = otherAmounts.amount;
      const { additionalStopCharge, amount, surge } = otherAmounts;
      newDoc['otherAmounts'] = otherAmounts;
      const tip = newDoc.tip ? Number(newDoc.tip) : 0;
      totalAmount +=
        amount +
        surge +
        newDoc?.otherPoints.length * additionalStopCharge +
        tip;
      newDoc['totalAmount'] = totalAmount;

      const booking = await this.bookingModel.create(newDoc);

      return {
        message: 'Booking created successfully',
        data: { booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserBookings({ user, status, page, limit }) {
    try {
      if (status) {
        status = this.getStatusFilter(status, 'status');
      }
      const filter = {
        createdBy: user._id,
        ...(status && { status }),
      };
      const bookings = await this.getBookings({ filter, page, limit });
      return {
        message: 'Bookings List',
        data: { bookings },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getDriverBookings({ user, status, bookingType, page, limit }) {
    try {
      if (status) {
        status = this.getStatusFilter(status, 'status');
      }
      if (bookingType) {
        bookingType = this.getStatusFilter(bookingType, 'bookingType');
      }
      const filter = {
        assignedTo: user._id,
        ...(status && { status }),
        ...(bookingType && { BookingType: bookingType }),
      };
      const bookings = await this.getAggregateBooking(filter, { page, limit });
      return {
        message: 'Bookings List',
        data: { bookings },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getBookings({ filter, page = 1, limit = 10 }) {
    try {
      const skip = (Number(page) - 1) * Number(limit);
      return await this.bookingModel
        .find(filter)
        .select(
          '_id status BookingAt totalAmount veletType startPoint.name endPoint.name',
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneBooking(filter) {
    try {
      return await this.bookingModel.findOne(filter);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAggregateBookingUser(filter: any) {
    try {
      const $match = {
        ...filter,
        ...(filter?._id && { _id: new mongoose.Types.ObjectId(filter?._id) }),
      };

      const $lookup = {
        from: 'drivermodels',
        localField: 'assignedTo',
        foreignField: '_id',
        as: 'assignedTo',
      };

      const $unwind = {
        path: '$assignedTo',
        preserveNullAndEmptyArrays: true,
      };

      const $project = {
        _id: 1,
        startPoint: 1,
        endPoint: 1,
        otherPoints: 1,
        amount: 1,
        status: 1,
        BookingType: 1,
        otherAmounts: 1,
        cancelationCharge: 1,
        BookingId: 1,
        BookingAt: 1,
        promotional: 1,
        totalAmount: 1,
        veletType: 1,
        note: 1,
        tip: 1,
        'assignedTo._id': 1,
        'assignedTo.firstName': 1,
        'assignedTo.lastName': 1,
        'assignedTo.phoneNumber': 1,
        'assignedTo.phoneCode': 1,
      };

      const ags = [{ $match }, { $lookup }, { $unwind }, { $project }];

      const bookings = await this.bookingModel.aggregate(ags);
      return bookings;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.FORBIDDEN);
    }
  }

  async getAggregateBooking(filter: any, paginate?: any) {
    try {
      const $match = {
        ...filter,
        ...(filter?._id && { _id: new mongoose.Types.ObjectId(filter?._id) }),
        // status: [BOOKING_STATUS.ASSIGNED, BOOKING_STATUS.COMPLETED],
      };

      const $lookup = {
        from: 'usermodels',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      };

      const $project = {
        _id: 1,
        startPoint: 1,
        endPoint: 1,
        otherPoints: 1,
        note: 1,
        paymentType: 1,
        amount: 1,
        status: 1,
        BookingType: 1,
        BookingId: 1,
        BookingAt: 1,
        totalAmount: 1,
        'createdBy._id': 1,
        'createdBy.firstName': 1,
        'createdBy.lastName': 1,
        'createdBy.phoneNumber': 1,
        'createdBy.phoneCode': 1,
        'createdBy.vehicleType': 1,
        'createdBy.carPlateNumber': 1,
      };

      const $unwind = '$createdBy';

      const limit = paginate?.limit ? Number(paginate?.limit) : 10;
      const page = paginate?.page ? Number(paginate?.page) : 1;

      const skip = limit * (page - 1);

      const ags = [
        { $match },
        { $lookup },
        { $unwind },
        { $project },
        { $limit: skip + limit },
        { $skip: skip },
      ];
      return await this.bookingModel.aggregate(ags);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneUserBooking(user, bookingId) {
    try {
      const filter = {
        createdBy: user._id,
        _id: bookingId,
      };
      const bookings = await this.getAggregateBookingUser(filter);
      const booking = bookings[0];
      if (!booking?.assignedTo) {
        booking['assignedTo'] = null;
      }
      return { message: 'User booking', data: { booking } };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.FORBIDDEN);
    }
  }

  async getOneDriverBookings(user, bookingId) {
    try {
      const filter = {
        assignedTo: user._id,
        _id: bookingId,
      };
      const booking = await this.getAggregateBooking(filter);
      return { message: 'Driver booking', data: { booking: booking[0] } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async bookingUserIssue(user, bookingId) {
    // try {
    // } catch (error) {
    // }
    throw new HttpException('Coming soon', HttpStatus.BAD_REQUEST);
  }

  // ?------- booking user / driver status handled

  async cancelBooking(user: any, bookingId: string) {
    try {
      const filter = {
        createdBy: user._id,
        _id: bookingId,
      };
      const bookingData = await this.getOneBooking(filter);
      this.handleBookingStatus(bookingData);
      if (bookingData.status === BOOKING_STATUS.STARTED) {
        throw new HttpException(
          'Booking can not be cancelled',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      if (bookingData.status === BOOKING_STATUS.ACCEPTED) {
        bookingData.cancelationCharge =
          bookingData?.otherAmounts.cancelationCharge;
      }
      bookingData.status = BOOKING_STATUS.CANCELLED;
      await bookingData.save();
      const booking = await this.getAggregateBookingUser(filter);
      return {
        message: 'Booking cancelled',
        data: { booking: booking[0] },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async acceptBooking(user: any, bookingId: string) {
    try {
      const filter = {
        assignedTo: user._id,
        _id: bookingId,
      };
      const booking = await this.getOneBooking(filter);
      if (booking.status === BOOKING_STATUS.ACCEPTED) {
        throw new HttpException(
          'Booking already accepted',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      this.handleBookingStatus(booking);
      booking.status = BOOKING_STATUS.ACCEPTED;
      await booking.save();
      const bookingAggData = await this.getOneDriverBookings(user, bookingId);
      return {
        message: 'Booking accepted',
        data: { booking: bookingAggData.data.booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async completeBooking(user: any, bookingId: string) {
    try {
      const filter = {
        assignedTo: user._id,
        _id: bookingId,
      };
      const booking = await this.getOneBooking(filter);
      this.handleBookingStatus(booking);
      booking.status = BOOKING_STATUS.COMPLETED;
      await booking.save();
      const bookingAggData = await this.getOneDriverBookings(user, bookingId);
      return {
        message: 'Booking completed',
        data: { booking: bookingAggData.data.booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async startBooking(user: any, bookingId: string) {
    try {
      const filter = {
        assignedTo: user._id,
        _id: bookingId,
      };
      const booking = await this.getOneBooking(filter);
      this.handleBookingStatus(booking);
      booking.status = BOOKING_STATUS.STARTED;
      await booking.save();
      const bookingAggData = await this.getOneDriverBookings(user, bookingId);

      return {
        message: 'Booking started',
        data: { booking: bookingAggData.data.booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async declineBooking(user: any, declineBookingDto: DeclineBookingDto) {
    try {
      const filter = {
        assignedTo: user._id,
        _id: declineBookingDto.bookingId,
      };
      const booking = await this.getOneBooking(filter);
      this.handleBookingStatus(booking);
      booking.status = BOOKING_STATUS.DECLINED;
      await this.bookingStatusModel.create({
        bookingId: declineBookingDto.bookingId,
        description: declineBookingDto.description,
        status: BOOKING_STATUS.DECLINED,
      });
      await booking.save();
      return {
        message: 'Booking declined',
        data: { booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async assignBooking(assignBookingDto: AssignBookingDto) {
    try {
      const booking = await this.bookingModel.findOne({
        _id: assignBookingDto.bookingId,
      });
      booking.assignedTo = assignBookingDto.driverId;
      booking.status = BOOKING_STATUS.ASSIGNED;
      await booking.save();
      return {
        message: 'Driver assigned successfully',
        data: { booking },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // !--------- Other handlings

  handleBookingStatus(booking) {
    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.BAD_REQUEST);
    }
    if (booking.status === BOOKING_STATUS.CANCELLED) {
      throw new HttpException(
        'Booking already cancelled',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (booking.status === BOOKING_STATUS.COMPLETED) {
      throw new HttpException(
        'Booking already completed',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  getStatusFilter(type, filterType) {
    type = type.toUpperCase();
    if (filterType === 'status')
      switch (type) {
        case 'AVAILABLE':
          return { $in: [BOOKING_STATUS.ASSIGNED] };

        case 'ONGOING':
          return {
            $in: [BOOKING_STATUS.ACCEPTED, BOOKING_STATUS.STARTED],
          };

        case 'CURRENT':
          return {
            $in: [
              BOOKING_STATUS.PENDING,
              BOOKING_STATUS.STARTED,
              BOOKING_STATUS.ASSIGNED,
              BOOKING_STATUS.ACCEPTED,
            ],
          };

        case 'PAST':
          return {
            $in: [
              BOOKING_STATUS.DECLINED,
              BOOKING_STATUS.CANCELLED,
              BOOKING_STATUS.COMPLETED,
            ],
          };

        case 'COMPLETED':
          return {
            $in: [
              BOOKING_STATUS.COMPLETED,
              BOOKING_STATUS.CANCELLED,
              BOOKING_STATUS.DECLINED,
            ],
          };

        default:
          return null;
      }
    else if (filterType === 'bookingType') {
      if (type === 'ALL') {
        return {
          $in: [BOOKING_TYPE.LATER, BOOKING_TYPE.NOW],
        };
      } else if (type) {
        return BOOKING_TYPE[type];
      } else {
        return null;
      }
    }
  }

  async getBookingAmount(newDoc: CreateBookingDto) {
    const { data } = await this.areaSettingsService.getPricing();
    const amountDetails = data.details;
    const dataToSend = {
      surge: amountDetails.surge,
      additionalStopCharge: amountDetails.additionalCharge,
      amount: 0,
      cancelationCharge: amountDetails.cancelationCharge,
    };
    switch (newDoc.veletType) {
      case 'NORMAL':
        dataToSend['amount'] = amountDetails.normalCharge;
        break;

      case 'PRIORITY':
        dataToSend['amount'] = amountDetails.priorityCharge;
        break;

      default:
        dataToSend['amount'] = amountDetails.normalCharge;
        break;
    }
    return dataToSend;
  }
}
