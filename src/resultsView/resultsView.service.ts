import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsViewEntity } from './resultsView.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ResultsViewService {
    constructor(
        @InjectRepository(ResultsViewEntity)
        private resultsViewRepository : Repository<ResultsViewEntity>
    ){}

    async findAll() : Promise<ResultsViewEntity[]>{
        return await this.resultsViewRepository.find();  
     }

     async findByPK(filter: string,id :number): Promise<ResultsViewEntity[]>{
        const idname= "id_"+ filter
        return await this.resultsViewRepository.findBy({[idname] : id})
    }




}
