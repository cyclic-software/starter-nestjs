import { TournamentService } from './tournament.service';
import { TournamentEntity } from './tournament.entity';
export declare class TournamentController {
    private tournamentService;
    constructor(tournamentService: TournamentService);
    get(): Promise<TournamentEntity[]>;
    getbyID(id: number): Promise<TournamentEntity>;
    save(nuevo: TournamentEntity): Promise<{
        sucess: boolean;
        data: TournamentEntity;
    }>;
    update(id: number, arch: TournamentEntity): Promise<{
        sucess: boolean;
        data: import("typeorm").UpdateResult;
    }>;
    delete(id: any): Promise<{
        sucess: boolean;
        data: string;
    }>;
}
