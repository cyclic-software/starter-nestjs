import { ResultsEntity } from "src/results/results.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "tbl_tournament_nrex"
})
export class TournamentEntity{
    
    @PrimaryGeneratedColumn()
    id_tournament: number

    @Column({type: "varchar", length: 64})
    name: string

    @Column({type: "varchar", length: 124})
    description: string

    @Column({type: "varchar", length: 64 })
    date: String

    @OneToMany(()=>ResultsEntity, (results)=> results.tournament)
    results : ResultsEntity[]

}