import { Module } from '@nestjs/common';
import {  TierlistController } from './tierlist.controller';
import {  TierlistService } from './tierlistt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  TierlistEntity } from './tierlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TierlistEntity])],
  controllers: [TierlistController],
  providers: [TierlistService]
})
export class TierlistModule {}
