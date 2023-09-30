import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.save(createOrderDto);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }
  
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
