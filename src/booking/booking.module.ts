import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModel, BookingSchema } from './schema/booking.schema';
import { PromotionalModule } from 'src/promotional/promotional.module';
import { AreaSettingsModule } from 'src/area-settings/area-settings.module';
import {
  BookingStatusModel,
  BookingStatusSchema,
} from './schema/bookingStatus.schema';

@Module({
  imports: [
    PromotionalModule,
    AreaSettingsModule,
    MongooseModule.forFeature([
      { name: BookingModel.name, schema: BookingSchema },
      { name: BookingStatusModel.name, schema: BookingStatusSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
