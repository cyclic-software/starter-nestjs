import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TierlistEntity } from './tierlist.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TierlistService {

    constructor(
        @InjectRepository(TierlistEntity)
        private tierlistRepository : Repository<TierlistEntity>
    ){}

    async findAll() : Promise<TierlistEntity[]>{
        return await this.tierlistRepository.find();
    }

    async findById(id_tierlist: number): Promise<TierlistEntity> {
        return await this.tierlistRepository.findOneBy({ id_tierlist })
    }

    async create(nuevo: TierlistEntity): Promise<TierlistEntity> {
        return await this.tierlistRepository.save(nuevo);
    }

    async update(id_tierlist, nuevo: TierlistEntity): Promise<UpdateResult> {
        return await this.tierlistRepository.update(id_tierlist, nuevo);
    }

    async delete(id_tierlist: number): Promise<string> {
        await this.tierlistRepository.delete({ id_tierlist });
        return 'ok';
    }
}
