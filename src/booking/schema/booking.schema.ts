import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DriverModel } from 'src/driver/schema/driver.schema';
import { UserModel } from 'src/user/schema/user.schema';
import {
  BOOKING_STATUS,
  BOOKING_TYPE,
  PAYMENT_TYPE,
  VELET_TYPE,
} from '../booking.enum';

const coordinateSchema = {
  latitude: { type: Number },
  longitude: { type: Number },
  name: { type: String },
  address: { type: String },
};

export type BookingDocument = BookingModel & Document;

@Schema()
class OtherAmountsSchema {
  @Prop({ default: 0 })
  cancelationCharge: number;

  @Prop({ default: 0 })
  surge: number;

  @Prop({ default: 0 })
  additionalStopCharge: number;
}

@Schema()
class PromotionalSchema {
  @Prop({ default: '' })
  promotionalCode: string;

  @Prop({ default: 0 })
  promotionalAmount: number;

  @Prop({ default: '' })
  promotionalType: string;
}

@Schema({ timestamps: true })
export class BookingModel {
  @Prop({ required: true, enum: BOOKING_TYPE, default: BOOKING_TYPE.NOW })
  BookingType: BOOKING_TYPE;

  @Prop({ required: true })
  BookingAt: number;

  @Prop({ required: true, unique: true })
  BookingId: number;

  @Prop({
    required: true,
    type: coordinateSchema,
  })
  startPoint: typeof coordinateSchema;

  @Prop({
    required: true,
    type: coordinateSchema,
  })
  endPoint: typeof coordinateSchema;

  @Prop({
    type: [coordinateSchema],
    default: [],
  })
  otherPoints: (typeof coordinateSchema)[];

  @Prop()
  note: string;

  @Prop({ required: true, enum: VELET_TYPE, default: VELET_TYPE.NORMAL })
  veletType: VELET_TYPE;

  @Prop()
  totalAmount: number;

  @Prop({ required: true, enum: PAYMENT_TYPE, default: PAYMENT_TYPE.CASH })
  paymentType: PAYMENT_TYPE;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  createdBy: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DriverModel.name,
  })
  assignedTo: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({
    enum: BOOKING_STATUS,
    default: BOOKING_STATUS.PENDING,
    required: true,
  })
  status: BOOKING_STATUS;

  @Prop({ default: 0 })
  tip: number;

  @Prop({ default: 0 })
  cancelationCharge: number;

  @Prop({ type: OtherAmountsSchema })
  otherAmounts: OtherAmountsSchema;

  @Prop({ type: PromotionalSchema })
  promotional: PromotionalSchema;
}

export const BookingSchema = SchemaFactory.createForClass(BookingModel);

// DriverOtpSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//     const retJson = {
//       phoneNumber: ret.phoneNumber,
//     };
//     return retJson;
//   },
// });
