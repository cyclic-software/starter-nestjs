import { formats } from "src/config/constants";
import { Entity } from "typeorm";
import { Column,  PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:"tbl_tierlist_nrex"
})
export class TierlistEntity{

    @PrimaryGeneratedColumn()
    id_tierlist:number

    @Column({type: "varchar", length: 64})
    name : string

    @Column({type: "int"})
    konami_id: number

    @Column({type:"enum", enum: ["Tier 0","Tier 1","Tier 2","Tier 3"]})
    category: string

    @Column({type : "enum", enum: formats, default: formats.DuelLinks})
    format: formats

    @Column({type:"varchar",  length: 12 })
    date: string
 

}