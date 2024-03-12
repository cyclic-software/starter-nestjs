import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsEntity } from './results.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ResultsService {
    constructor(
        @InjectRepository(ResultsEntity)
        private tornamentRepository : Repository<ResultsEntity>
    ){}

    async findAll() : Promise<ResultsEntity[]>{
        return await this.tornamentRepository.find();
    }

    async findById(id_result: number): Promise<ResultsEntity> {
        return await this.tornamentRepository.findOneBy({ id_result })
    }

    async findByTournament(id_tournament_fk :number): Promise<ResultsEntity[]>{
        return await this.tornamentRepository.findBy({id_tournament_fk})
    }

    async findByPlayer(id_player_fk :number): Promise<ResultsEntity[]>{
        return await this.tornamentRepository.findBy({id_player_fk})
    }

    async create(nuevo: ResultsEntity): Promise<ResultsEntity> {
        return await this.tornamentRepository.save(nuevo);
    }

    async createBulk(nuevo: ResultsEntity[]): Promise<ResultsEntity[]> {
        return await this.tornamentRepository.save(nuevo);
    }

    async update(id_result, nuevo: ResultsEntity): Promise<UpdateResult> {
        return await this.tornamentRepository.update(id_result, nuevo);
    }

    async delete(id_result: number): Promise<string> {
        await this.tornamentRepository.delete({ id_result });
        return 'ok';
    }
}
