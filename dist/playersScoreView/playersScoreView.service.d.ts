import { PlayersScoreViewEntity } from './playersScoreView.entity';
import { Repository } from 'typeorm';
export declare class PlayersScoreViewService {
    private PlayersScoreViewRepository;
    constructor(PlayersScoreViewRepository: Repository<PlayersScoreViewEntity>);
    findAll(): Promise<PlayersScoreViewEntity[]>;
}
