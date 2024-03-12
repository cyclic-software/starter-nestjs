import { ResultsViewService } from './resultsView.service';
export declare class ResultsViewController {
    private resultsService;
    constructor(resultsService: ResultsViewService);
    get(): Promise<import("./resultsView.entity").ResultsViewEntity[]>;
    getByTournament(filter: any, id: any): Promise<import("./resultsView.entity").ResultsViewEntity[]>;
}
