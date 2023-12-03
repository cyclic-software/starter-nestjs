import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeIjin } from '../interface/ijin.enum';
import { StatusIjin } from '../interface/status-ijin.enum';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Ijin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.id)
  users: Users;

  @Column({ nullable: true })
  title: string;

  @Column({ default: TypeIjin.IJIN })
  type: string;

  @Column({ nullable: true, type: 'timestamp' })
  date_ijin: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ default: StatusIjin.PENDING })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  mimetype: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
