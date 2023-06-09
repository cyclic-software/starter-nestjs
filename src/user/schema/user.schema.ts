import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { vehicleType } from '../user.enum';
// import * as mongoose from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true })
export class UserModel {
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
  carPlateNumber: string;

  @Prop({ enum: vehicleType })
  vehicleType: string;

  @Prop({ default: [] })
  sessions: [string];

  @Prop({ default: false })
  isProfileCompleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
