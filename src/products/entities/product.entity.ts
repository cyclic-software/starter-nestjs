import {
  Column,
  CreateDateColumn,
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
  @Column({ scale: 2 })
  productCostPrice: number;
  @Column({ scale: 2 })
  productSellingPrice: number;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
}
