import { PlayersService } from './players.service';
import { PlayersEntity } from './players.entity';
export declare class PlayersController {
    private playersService;
    constructor(playersService: PlayersService);
    get(): Promise<PlayersEntity[]>;
    getbyID(id: number): Promise<PlayersEntity>;
    save(nuevo: PlayersEntity): Promise<{
        sucess: boolean;
        data: PlayersEntity;
    }>;
    saveBulk(nuevo: PlayersEntity[]): Promise<{
        sucess: boolean;
        data: PlayersEntity[];
    }>;
    update(id: number, arch: PlayersEntity): Promise<{
        sucess: boolean;
        data: import("typeorm").UpdateResult;
    }>;
    delete(id: any): Promise<{
        sucess: boolean;
        data: string;
    }>;
}
