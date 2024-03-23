import { ResultsEntity } from "src/results/results.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'tbl_players_nrex'
})
export class PlayersEntity{

    @PrimaryColumn({type:"int"})
    id_player: number

    @Column({nullable:false, length: 32, type: "varchar"})
    name: string

    @Column({type: "varchar", length: "256"})
    picture: string

    @OneToMany(()=> ResultsEntity, (result) => result.player)
    results: ResultsEntity[]

}
