import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { accountStatus, licenseType, status } from '../driver.enum';

export type DriverDocument = DriverModel & Document;

@Schema({ timestamps: true })
export class DriverModel {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  phoneCode: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  nameAsInBankAccount: string;

  @Prop()
  bankName: string;

  @Prop()
  bankAccountNumber: string;

  @Prop({ enum: licenseType })
  licenseType: string;

  @Prop({ default: [] })
  sessions: [string];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookingmodels',
  })
  currentOngoingBooking: [mongoose.Types.ObjectId];

  @Prop({ enum: accountStatus, default: accountStatus.PENDING })
  accountStatus: string;

  @Prop({ enum: status, default: status.IN_ACTIVE })
  status: string;

  @Prop({ required: true, unique: true })
  driverId: string;
}

export const DriverSchema = SchemaFactory.createForClass(DriverModel);
