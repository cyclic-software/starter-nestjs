import { BanlistService } from './banlist.service';
import { BanlistEntity } from './banlist.entity';
export declare class BanlistController {
    private banlistService;
    constructor(banlistService: BanlistService);
    get(): Promise<BanlistEntity[]>;
    save(nuevo: BanlistEntity): Promise<{
        sucess: boolean;
        data: BanlistEntity;
    }>;
    update(id_ban: number, arch: BanlistEntity): Promise<{
        sucess: boolean;
        data: import("typeorm").UpdateResult;
    }>;
    delete(id: any): Promise<{
        sucess: boolean;
        data: string;
    }>;
}
