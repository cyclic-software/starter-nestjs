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
     console.log('createCustomerDto',createCustomerDto)
     return createCustomerDto;
     //return this.customersRepository.save(createCustomerDto);
  }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
