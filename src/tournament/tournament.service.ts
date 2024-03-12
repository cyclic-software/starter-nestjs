import { Injectable } from '@nestjs/common';
import { TournamentEntity } from './tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TournamentService {

    constructor(
        @InjectRepository(TournamentEntity)
        private tornamentRepository : Repository<TournamentEntity>
    ){}

    async findAll() : Promise<TournamentEntity[]>{
        return await this.tornamentRepository.find();
    }

    async findById(id_tournament: number): Promise<TournamentEntity> {
        return await this.tornamentRepository.findOneBy({ id_tournament })
    }

    async create(nuevo: TournamentEntity): Promise<TournamentEntity> {
        return await this.tornamentRepository.save(nuevo);
    }

    async update(id_tournament, nuevo: TournamentEntity): Promise<UpdateResult> {
        return await this.tornamentRepository.update(id_tournament, nuevo);
    }

    async delete(id_tournament: number): Promise<string> {
        await this.tornamentRepository.delete({ id_tournament });
        return 'ok';
    }
}
