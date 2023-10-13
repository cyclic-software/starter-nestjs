import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customersRepository.save(createCustomerDto);
  }

  findAll({ pageSize, pageIndex }): Promise<[Customer[], number]> {
    return this.customersRepository.findAndCount({
      skip: pageSize * pageIndex,
      take: pageSize,
    });
  }

  findOne(customerId: number) {
    return this.customersRepository.findOneBy({ customerId });
  }

  findByNameOrMobileNumber(searchKey: string) {
    return this.customersRepository.find({
      where: [
        {
          mobileNumber: ILike('%' + searchKey + '%'),
        },
        {
          firstName: ILike('%' + searchKey + '%'),
        },
        {
          lastName: ILike('%' + searchKey + '%'),
        },
      ],
      take: 5,
    });
  }

  update(customerId: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update({ customerId }, updateCustomerDto);
  }

  remove(customerId: number) {
    return this.customersRepository.softDelete({ customerId });
  }
}
