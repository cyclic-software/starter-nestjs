import { Module } from '@nestjs/common';
import { BanlistController } from './banlist.controller';
import { BanlistService } from './banlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanlistEntity } from './banlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BanlistEntity])],
  controllers: [BanlistController],
  providers: [BanlistService]
})
export class BanlistModule {}
