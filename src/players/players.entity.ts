import { ResultsEntity } from "src/results/results.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tbl_players_nrex'
})
export class PlayersEntity{

    @PrimaryGeneratedColumn()
    id_player: number

    @Column({nullable:false, length: 32, type: "varchar"})
    name: string

    @Column({nullable:false, length: 32, type: "varchar"})
    id_stargg: string

    @Column({nullable:false, length: 128, type: "varchar"})
    aboutme: string

    @Column({type: "int", nullable:false})
    master_card_ki: number

    @OneToMany(()=> ResultsEntity, (result) => result.player)
    results: ResultsEntity[]

}
