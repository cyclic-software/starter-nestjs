import { Customer } from 'src/customers/entities/customer.entity';
import { CreateOrderItemDto } from './create-orderItem.dto';

export class CreateOrderDto {
  customerId: number;
  taxPerctange: number;
  items: CreateOrderItemDto[];
}
