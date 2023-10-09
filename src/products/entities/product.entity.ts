import { OrderItem } from 'src/orders/entities/orderItem.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;
  @Column()
  productName: string;
  @Column({ scale: 2, default: 0 })
  productStock: number;
  @Column({ scale: 2, default: 0 })
  productCostPrice: number;
  @Column({ scale: 2, default: 0 })
  productSellingPrice: number;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productId) // specify inverse side as a second parameter
  orderItems: OrderItem[];
}
