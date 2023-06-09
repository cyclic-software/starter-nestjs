import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PROMOTIONAL_TYPE } from '../promotional.enum';
import * as mongoose from 'mongoose';
import { UserModel } from 'src/user/schema/user.schema';

export type PromotionalDocument = PromotionalModel & Document;

@Schema({ timestamps: true })
export class PromotionalModel {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  code: string;

  @Prop()
  termsAndCondition: string;

  @Prop({
    required: true,
    enum: PROMOTIONAL_TYPE,
    default: PROMOTIONAL_TYPE.AMOUNT,
  })
  type: PROMOTIONAL_TYPE;

  @Prop({ required: true })
  expiredAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel.name,
  })
  assignedFor: mongoose.Types.ObjectId;
}

export const PromotionalSchema = SchemaFactory.createForClass(PromotionalModel);
