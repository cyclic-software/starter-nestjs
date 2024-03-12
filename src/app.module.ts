import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormService } from './typeorm/typeorm.service';
import { TournamentModule } from './tournament/tournament.module';
import { ConfigModule } from '@nestjs/config';
import { BanlistModule } from './banlist/banlist.module';
import { ResultsModule } from './results/results.module';
import { PlayersModule } from './players/players.module';
import { TierlistModule } from './tierlist/tierlist.module';
import { ResultsViewModule } from './resultsView/resultsView.module';
import { PlayersScoreViewModule } from './playersScoreView/playersScoreView.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TournamentModule,
    BanlistModule,
    ResultsModule,
    PlayersModule,
    TierlistModule,  
    ResultsViewModule, 
    PlayersScoreViewModule,
    AuthModule,     
    UsersModule,
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    
    TypeOrmModule.forRootAsync({
      useClass: TypeormService
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TypeormService
  ],
})


export class AppModule {

}
