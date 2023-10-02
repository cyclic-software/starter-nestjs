import { Customer } from 'src/customers/entities/customer.entity';
import { CreateOrderItemDto } from './create-orderItem.dto';

export class CreateOrderDto {
  customerId: number;
  totalBeforeTax: number;
  taxPerctange: number;
  grandTotal: number;
  items: CreateOrderItemDto[];
}
