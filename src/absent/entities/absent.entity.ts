import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from '../dto/type.enum';
@Entity()
export class Absent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  date: Date;

  @Column({ type: 'time', nullable: false })
  time: string;

  @Column({
    type: 'enum',
    enum: Type,
    nullable: false,
  })
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  longlat: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  mimetype: string;

  @ManyToOne(() => Users, (users) => users.id)
  users: Users;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
