import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customersRepository.save(createCustomerDto);
  }

  findAll( page: any, where: any): Promise<[Customer[], number]> {
    const { pageSize, pageIndex } = page;
    return this.customersRepository.findAndCount({
      skip: pageSize * pageIndex,
      take: pageSize,
      order: {
        createdDate: 'DESC',
      },
      where
    });
  }

  findOne(customerId: number) {
    return this.customersRepository.findOneBy({ customerId });
  }

  findAllOrdersByCustomerId(customerId: number, page: any, where: any) {
    const pWhere = {
      ...where,
      customerId,
    };
    const { pageSize, pageIndex } = page;
    return this.orderRepository.findAndCount({
      skip: pageSize * pageIndex,
      take: pageSize,
      order: {
        createdDate: 'DESC',
      },
      where : pWhere,
    });
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
