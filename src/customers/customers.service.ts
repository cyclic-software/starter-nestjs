import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
     return this.customersRepository.save(createCustomerDto);
  }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(customerId: number) {
    return this.customersRepository.findOneBy({ customerId });
  }

  update(customerId: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update({ customerId }, updateCustomerDto);
  }

  remove(customerId: number) {
    return this.customersRepository.softDelete({ customerId });
  }
}
