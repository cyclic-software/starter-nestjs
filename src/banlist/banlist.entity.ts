import { formats } from "src/config/constants";
import { Entity } from "typeorm";
import { Column,  PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:"tbl_banlist_nrex"
})
export class BanlistEntity{

 
    @PrimaryGeneratedColumn()
    id_ban:number

    @Column({type: "varchar", length: 64})
    name : string

    @Column({type: 'int'})
    konami_id : string

    @Column({type:"enum", enum: ["forbidden","limited","semi-limited","semi-released","released"]})
    limitation: string

    @Column({type : "enum", enum: formats, default: formats.DuelLinks})
    format: string

    @Column({type:"varchar",  length: 12 })
    date: string
 

}