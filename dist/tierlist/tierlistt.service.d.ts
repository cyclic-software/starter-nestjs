import { TierlistEntity } from './tierlist.entity';
import { Repository, UpdateResult } from 'typeorm';
export declare class TierlistService {
    private tierlistRepository;
    constructor(tierlistRepository: Repository<TierlistEntity>);
    findAll(): Promise<TierlistEntity[]>;
    findById(id_tierlist: number): Promise<TierlistEntity>;
    create(nuevo: TierlistEntity): Promise<TierlistEntity>;
    update(id_tierlist: any, nuevo: TierlistEntity): Promise<UpdateResult>;
    delete(id_tierlist: number): Promise<string>;
}
