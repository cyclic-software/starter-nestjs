import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersEntity } from './players.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PlayersService {
    
    constructor(
        @InjectRepository(PlayersEntity)
        private playersRepository : Repository<PlayersEntity>
    ){}

    async findAll() : Promise<PlayersEntity[]>{
        return await this.playersRepository.find();
    }

    async findById(id_player: number): Promise<PlayersEntity> {
        return await this.playersRepository.findOneBy({ id_player })
    }

    async create(nuevo: PlayersEntity): Promise<PlayersEntity> {
        return await this.playersRepository.save(nuevo);
    }

    async createBulk(nuevo: PlayersEntity[]): Promise<PlayersEntity[]> {
        return await this.playersRepository.save(nuevo);
    }


    async update(id_player, nuevo: PlayersEntity): Promise<UpdateResult> {
        return await this.playersRepository.update(id_player, nuevo);
    }

    async delete(id_player: number): Promise<string> {
        await this.playersRepository.delete({ id_player });
        return 'ok';
    }
}
