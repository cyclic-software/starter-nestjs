import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date
  @UpdateDateColumn()
  updatedDate: Date
}
