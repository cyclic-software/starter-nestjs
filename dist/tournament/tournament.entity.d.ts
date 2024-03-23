import { formats } from "src/config/constants";
import { ResultsEntity } from "src/results/results.entity";
export declare class TournamentEntity {
    id_tournament: number;
    picture: string;
    name: string;
    description: string;
    date: String;
    format: formats;
    results: ResultsEntity[];
}
