import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersScoreViewEntity } from './playersScoreView.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PlayersScoreViewService {
    constructor(
        @InjectRepository(PlayersScoreViewEntity)
        private PlayersScoreViewRepository : Repository<PlayersScoreViewEntity>
    ){}

    async findAll() : Promise<PlayersScoreViewEntity[]>{
        return await this.PlayersScoreViewRepository.find();  
     }




}
