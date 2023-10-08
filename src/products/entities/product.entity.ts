import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
}
