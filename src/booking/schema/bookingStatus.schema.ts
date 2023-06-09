import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BookingModel } from './booking.schema';
import { BOOKING_STATUS } from '../booking.enum';

export type BookingStatusDocument = BookingStatusModel & Document;

@Schema({ timestamps: true })
export class BookingStatusModel {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: BookingModel.name,
    required: true,
  })
  bookingId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({
    enum: BOOKING_STATUS,
    default: BOOKING_STATUS.PENDING,
    required: true,
  })
  status: BOOKING_STATUS;
}

export const BookingStatusSchema =
  SchemaFactory.createForClass(BookingStatusModel);
