import { formats } from "src/config/constants";
export declare class ResultsViewEntity {
    id_player: number;
    id_tournament: number;
    player_name: string;
    picture: string;
    t_picture: string;
    tournament_name: string;
    place: number;
    points: number;
    format: formats;
}
