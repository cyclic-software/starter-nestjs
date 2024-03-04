import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersEntity } from './players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersEntity])],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
