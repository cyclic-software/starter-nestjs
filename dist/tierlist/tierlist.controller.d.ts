import { TierlistService } from './tierlistt.service';
import { TierlistEntity } from './tierlist.entity';
export declare class TierlistController {
    private tierlistService;
    constructor(tierlistService: TierlistService);
    get(): Promise<TierlistEntity[]>;
    save(nuevo: TierlistEntity): Promise<{
        sucess: boolean;
        data: TierlistEntity;
    }>;
    update(id: number, arch: TierlistEntity): Promise<{
        sucess: boolean;
        data: import("typeorm").UpdateResult;
    }>;
    delete(id: any): Promise<{
        sucess: boolean;
        data: string;
    }>;
}
