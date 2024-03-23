import { formats } from "src/config/constants";
import { PlayersEntity } from "src/players/players.entity";
import { TournamentEntity } from "src/tournament/tournament.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "tbl_results_nrex"
})
export class ResultsEntity{

    @PrimaryGeneratedColumn()
    id_result: number

    @Column({name: 'id_player_fk'})
    id_player_fk: number

    @Column({name: 'id_tournament_fk'})
    id_tournament_fk : number

    @Column({type : "enum", enum: formats, default: formats.DuelLinks})
    format: formats

    @Column({type: "int"})
    place: number

    @Column({type: "int"})
    points: number


    @ManyToOne(()=> PlayersEntity, (player)=> player.results)
    @JoinColumn({name: "id_player_fk", foreignKeyConstraintName: "tbl_results_fk_tbl_player_id_player"})
    player : PlayersEntity

    @ManyToOne(()=> TournamentEntity, (tournament)=> tournament.results)
    @JoinColumn({name: "id_tournament_fk", foreignKeyConstraintName: "tbl_results_fk_tbl_tournament_id_tournament"})
    tournament : TournamentEntity

}