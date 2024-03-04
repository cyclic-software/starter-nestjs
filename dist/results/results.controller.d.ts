import { ResultsService } from './results.service';
import { ResultsEntity } from './results.entity';
export declare class ResultsController {
    private resultsService;
    constructor(resultsService: ResultsService);
    get(): Promise<ResultsEntity[]>;
    getByTournament(id: any): Promise<{
        succes: boolean;
        data: ResultsEntity[];
    }>;
    getByPlayer(id: any): Promise<{
        succes: boolean;
        data: ResultsEntity[];
    }>;
    save(nuevo: ResultsEntity): Promise<{
        sucess: boolean;
        data: ResultsEntity;
    }>;
    update(id: number, arch: ResultsEntity): Promise<{
        sucess: boolean;
        data: import("typeorm").UpdateResult;
    }>;
    delete(id: any): Promise<{
        sucess: boolean;
        data: string;
    }>;
}
