import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DriverModule } from './driver/driver.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { PromotionalModule } from './promotional/promotional.module';
import { AreaSettingsModule } from './area-settings/area-settings.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(ConfigService.keys.MONGO_URL),
    UserModule,
    DriverModule,
    AuthModule,
    BookingModule,
    PromotionalModule,
    AreaSettingsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
