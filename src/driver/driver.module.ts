import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverOtpModel, DriverOtpSchema } from './schema/driver.otp.schema';
import { DriverModel, DriverSchema } from './schema/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DriverModel.name, schema: DriverSchema },
      { name: DriverOtpModel.name, schema: DriverOtpSchema },
    ]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
