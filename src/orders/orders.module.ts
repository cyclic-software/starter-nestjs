import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Product, Order, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
