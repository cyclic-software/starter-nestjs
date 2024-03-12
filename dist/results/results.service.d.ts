import { ResultsEntity } from './results.entity';
import { Repository, UpdateResult } from 'typeorm';
export declare class ResultsService {
    private tornamentRepository;
    constructor(tornamentRepository: Repository<ResultsEntity>);
    findAll(): Promise<ResultsEntity[]>;
    findById(id_result: number): Promise<ResultsEntity>;
    findByTournament(id_tournament_fk: number): Promise<ResultsEntity[]>;
    findByPlayer(id_player_fk: number): Promise<ResultsEntity[]>;
    create(nuevo: ResultsEntity): Promise<ResultsEntity>;
    createBulk(nuevo: ResultsEntity[]): Promise<ResultsEntity[]>;
    update(id_result: any, nuevo: ResultsEntity): Promise<UpdateResult>;
    delete(id_result: number): Promise<string>;
}
