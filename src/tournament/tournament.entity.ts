import { formats } from "src/config/constants";
import { ResultsEntity } from "src/results/results.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "tbl_tournament_nrex"
})
export class TournamentEntity{
    
    @PrimaryColumn()
    id_tournament: number

    @Column({type: "int", unique: true, nullable:false})
    stargg_tourney: number

    @Column({type: "varchar", length: 64})
    name: string

    @Column({type: "varchar", length: 124})
    description: string

    @Column({type: "varchar", length: 64 })
    date: String

    @Column({type : "enum", enum: formats, default: formats.DuelLinks})
    format: formats

    @OneToMany(()=>ResultsEntity, (results)=> results.tournament)
    results : ResultsEntity[]

}