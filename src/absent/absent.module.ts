import { Module } from '@nestjs/common';
import { AbsentService } from './absent.service';
import { AbsentController } from './absent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absent } from './entities/absent.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Absent]), UsersModule],
  controllers: [AbsentController],
  providers: [AbsentService],
})
export class AbsentModule {}
