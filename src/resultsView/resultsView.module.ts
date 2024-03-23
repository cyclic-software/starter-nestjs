import { Module } from '@nestjs/common';
import { ResultsViewController } from './resultsView.controller';
import { ResultsViewService } from './resultsView.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsViewEntity } from './resultsView.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultsViewEntity])],
  controllers: [ResultsViewController],
  providers: [ResultsViewService]
})
export class ResultsViewModule {}
