import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne((type) => Customer, (customer) => customer.customerId, { cascade: true })
  customerId: Customer;

  @Column()
  totalBeforeTax: number;

  @Column()
  taxPerctange: number;

  @Column()
  grandTotal: number;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.orderId,{ cascade: true,  createForeignKeyConstraints: false })
  items: OrderItem[];
}
