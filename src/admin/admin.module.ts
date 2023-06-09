import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/user/schema/user.schema';
import { DriverModel, DriverSchema } from 'src/driver/schema/driver.schema';
import { AdminModel, AdminSchema } from './schema/admin.schema';
import { PassportModule } from '@nestjs/passport';
import { AdminLocalStrategy } from './admin-local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: DriverModel.name, schema: DriverSchema },
      { name: AdminModel.name, schema: AdminSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminLocalStrategy, SessionSerializer],
})
export class AdminModule {}
