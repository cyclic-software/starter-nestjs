import { BanlistEntity } from './banlist.entity';
import { Repository, UpdateResult } from 'typeorm';
export declare class BanlistService {
    private banlistRepository;
    constructor(banlistRepository: Repository<BanlistEntity>);
    findAll(): Promise<BanlistEntity[]>;
    findById(id_ban: number): Promise<BanlistEntity>;
    create(nuevo: BanlistEntity): Promise<BanlistEntity>;
    update(id_ban: any, nuevo: BanlistEntity): Promise<UpdateResult>;
    delete(id_ban: number): Promise<string>;
}
