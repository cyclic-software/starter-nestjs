import { Module } from '@nestjs/common';
import { IjinService } from './ijin.service';
import { IjinController } from './ijin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ijin } from './entities/ijin.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ijin]), UsersModule],
  controllers: [IjinController],
  providers: [IjinService],
})
export class IjinModule {}
