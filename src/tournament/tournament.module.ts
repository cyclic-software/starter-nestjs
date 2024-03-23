import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity])],
  controllers: [TournamentController],
  providers: [TournamentService]
})
export class TournamentModule {}
