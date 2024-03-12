import { PlayersScoreViewService } from './playersScoreView.service';
export declare class PlayersScoreViewController {
    private playersScoreViewService;
    constructor(playersScoreViewService: PlayersScoreViewService);
    get(): Promise<import("./playersScoreView.entity").PlayersScoreViewEntity[]>;
}
