import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @ManyToOne((type) => Order, (order) => order.items,{
    createForeignKeyConstraints:false,
  })
  orderId: Order;

  @ManyToMany((type) => Product, (product) => product.productId)
  @JoinColumn()
  productId: Product;

  @Column()
  quantity: number;

  @Column()
  cost: number;
}
