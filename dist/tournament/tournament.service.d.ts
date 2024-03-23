import { TournamentEntity } from './tournament.entity';
import { Repository, UpdateResult } from 'typeorm';
export declare class TournamentService {
    private tornamentRepository;
    constructor(tornamentRepository: Repository<TournamentEntity>);
    findAll(): Promise<TournamentEntity[]>;
    findById(id_tournament: number): Promise<TournamentEntity>;
    create(nuevo: TournamentEntity): Promise<TournamentEntity>;
    update(id_tournament: any, nuevo: TournamentEntity): Promise<UpdateResult>;
    delete(id_tournament: number): Promise<string>;
}
