import { ResultsEntity } from "src/results/results.entity";
export declare class TournamentEntity {
    id_tournament: number;
    name: string;
    description: string;
    date: String;
    results: ResultsEntity[];
}
