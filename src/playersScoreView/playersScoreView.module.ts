import { Module } from '@nestjs/common';
import { PlayersScoreViewController } from './playersScoreView.controller';
import { PlayersScoreViewService } from './playersScoreView.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersScoreViewEntity } from './playersScoreView.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersScoreViewEntity])],
  controllers: [PlayersScoreViewController],
  providers: [PlayersScoreViewService]
})
export class PlayersScoreViewModule {}
