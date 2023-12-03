import { Module, forwardRef } from '@nestjs/common';
import { SeederProvider } from './seeder.provider';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { UsersSeeders } from './users.seeder';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => UsersModule)],
  providers: [SeederProvider, UsersSeeders, UsersService, EmailService],
})
export class SeederModule {}
