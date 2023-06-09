import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AdminDocument = AdminModel & Document;

@Schema({ timestamps: true })
export class AdminModel {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);
