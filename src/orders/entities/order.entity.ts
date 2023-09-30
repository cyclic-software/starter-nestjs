import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  
  @OneToOne((type) => Customer, (customer) => customer.customerId)
  @JoinColumn()
  customerId: Customer;

  @Column()
  totalBeforeTax: number;

  @Column()
  taxPerctange: number;

  @Column()
  grandTotal: number;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.orderId)
  items: OrderItem[];
}
