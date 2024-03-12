import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BanlistEntity } from './banlist.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BanlistService {

    constructor(
        @InjectRepository(BanlistEntity)
        private banlistRepository : Repository<BanlistEntity>
    ){}

    async findAll() : Promise<BanlistEntity[]>{
        return await this.banlistRepository.find();
    }

    async findById(id_ban: number): Promise<BanlistEntity> {
        return await this.banlistRepository.findOneBy({ id_ban })
    }

    async create(nuevo: BanlistEntity): Promise<BanlistEntity> {
        return await this.banlistRepository.save(nuevo);
    }

    async update(id_ban, nuevo: BanlistEntity): Promise<UpdateResult> {
        return await this.banlistRepository.update(id_ban, nuevo);
    }

    async delete(id_ban: number): Promise<string> {
        await this.banlistRepository.delete({ id_ban });
        return 'ok';
    }
}
