import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/roles/role.enum";


@Entity({
    name: 'tbl_usuarios'
})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id_user: number;
    @Column({type: 'varchar', length:12})
    username: string
    @Column({type: "varchar", length:20})
    password: string
    @Column({type:"enum", enum: Role, default:"Client"})
    role: string

}