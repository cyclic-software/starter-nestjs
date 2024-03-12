import { ResultsViewEntity } from './resultsView.entity';
import { Repository } from 'typeorm';
export declare class ResultsViewService {
    private resultsViewRepository;
    constructor(resultsViewRepository: Repository<ResultsViewEntity>);
    findAll(): Promise<ResultsViewEntity[]>;
    findByPK(filter: string, id: number): Promise<ResultsViewEntity[]>;
}
