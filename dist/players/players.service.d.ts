import { PlayersEntity } from './players.entity';
import { Repository, UpdateResult } from 'typeorm';
export declare class PlayersService {
    private playersRepository;
    constructor(playersRepository: Repository<PlayersEntity>);
    findAll(): Promise<PlayersEntity[]>;
    findById(id_player: number): Promise<PlayersEntity>;
    create(nuevo: PlayersEntity): Promise<PlayersEntity>;
    createBulk(nuevo: PlayersEntity[]): Promise<PlayersEntity[]>;
    update(id_player: any, nuevo: PlayersEntity): Promise<UpdateResult>;
    delete(id_player: number): Promise<string>;
}
