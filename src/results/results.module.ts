import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsEntity } from './results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultsEntity])],
  controllers: [ResultsController],
  providers: [ResultsService]
})
export class ResultsModule {}
