import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  customerId: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  address: string;
  @Column()
  gstNumber: string;
  @Column()
  additionalInfo: string;
  @Column()
  mobileNumber: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date
  @UpdateDateColumn()
  updatedDate: Date
}
