import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne((type) => Customer, (customer) => customer.customerId, {
    cascade: true,
  })
  customerId: Customer;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalBeforeTax: number;

  @Column()
  taxPerctange: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.orderId, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  items: OrderItem[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
