import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @ManyToOne((type) => Order, (order) => order.items, {
    createForeignKeyConstraints: false,
  })
  orderId: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true,
  })
  productId: Product;

  @Column()
  quantity: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  pricePerUnit: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  cost: number;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  updateCost() {
    this.cost = this.quantity * this.pricePerUnit;
  }
}
