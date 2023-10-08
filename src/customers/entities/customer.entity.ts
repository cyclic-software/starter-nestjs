import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column({
    nullable: true,
  })
  gstNumber: string;
  @Column({
    nullable: true,
  })
  additionalInfo: string;
  @Column()
  mobileNumber: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @OneToMany((type) => Order, (order) => order.orderId)
  orders: Order[];
  @DeleteDateColumn()
  deletedAt?: Date;
}
