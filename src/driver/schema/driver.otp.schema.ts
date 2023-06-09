import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DRIVER_OTP_TYPE } from '../driver.enum';

export type DriverOtpDocument = DriverOtpModel & Document;

@Schema({ timestamps: true })
export class DriverOtpModel {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  phoneCode: number;

  @Prop({ required: true })
  otp: string;

  @Prop({
    type: String,
    required: true,
    enum: DRIVER_OTP_TYPE,
    default: DRIVER_OTP_TYPE.LOGIN,
  })
  type: string;
}

export const DriverOtpSchema = SchemaFactory.createForClass(DriverOtpModel);

// DriverOtpSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//     const retJson = {
//       phoneNumber: ret.phoneNumber,
//     };
//     return retJson;
//   },
// });
