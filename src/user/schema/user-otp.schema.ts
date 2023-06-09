import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_OTP_TYPE } from '../user.enum';

export type UserOtpDocument = UserOtpModel & Document;

@Schema({ timestamps: true })
export class UserOtpModel {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  phoneCode: number;

  @Prop({ required: true })
  otp: string;

  @Prop({
    type: String,
    required: true,
    enum: USER_OTP_TYPE,
    default: USER_OTP_TYPE.LOGIN,
  })
  type: string;
}

export const UserOtpSchema = SchemaFactory.createForClass(UserOtpModel);

// UserOtpSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//     const retJson = {
//       phoneNumber: ret.phoneNumber,
//     };
//     return retJson;
//   },
// });
