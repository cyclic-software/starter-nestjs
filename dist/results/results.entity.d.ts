import { PlayersEntity } from "src/players/players.entity";
import { TournamentEntity } from "src/tournament/tournament.entity";
export declare class ResultsEntity {
    id_result: number;
    id_player_fk: number;
    id_tournament_fk: number;
    place: number;
    points: number;
    player: PlayersEntity;
    tournament: TournamentEntity;
}
