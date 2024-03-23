import { ResultsService } from './results.service';
import { ResultsEntity } from './results.entity';
export declare class ResultsController {
    private resultsService;
    constructor(resultsService: ResultsService);
    get(): Promise<ResultsEntity[]>;
    getByTournament(id: any): Promise<ResultsEntity[]>;
    getByPlayer(id: any): Promise<ResultsEntity[]>;
    save(nuevo: ResultsEntity): Promise<{
        sucess: boolean;
        data: ResultsEntity;
    }>;
    saveBulk(nuevo: ResultsEntity[]): Promise<{
        sucess: boolean;
        data: ResultsEntity[];
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
