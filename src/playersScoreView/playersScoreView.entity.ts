
import { formats } from "src/config/constants";
import {  ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: "view_players_with_score",
    expression: `
    SELECT 
    p.id_player AS id_player, 
    p.name AS player_name,
    p.picture AS picture,
    r.format as format,
    sum(r.points) AS total_points
    FROM
        tbl_players_nrex p
    JOIN
        tbl_results_nrex r 
    ON r.id_player_fk  = p.id_player
    GROUP BY p.id_player,r.format
    

    `
})
export class PlayersScoreViewEntity{


    @ViewColumn()
    id_player : number

    @ViewColumn()
    player_name: string  

    @ViewColumn()
    picture: string

    @ViewColumn()
    total_points: number

    @ViewColumn()
    format : formats

    



}