import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDto) {
    return this.suppliersRepository.save(createSupplierDto);
  }

  findAll({ pageSize, pageIndex }): Promise<[Supplier[], number]> {
    return this.suppliersRepository.findAndCount({
      skip: pageSize * pageIndex,
      take: pageSize,
    });
  }

  findOne(supplierId: number) {
    return this.suppliersRepository.findOneBy({ supplierId });
  }

  update(supplierId: number, updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersRepository.update({ supplierId }, updateSupplierDto);
  }

  remove(supplierId: number) {
    return this.suppliersRepository.softDelete({ supplierId });
  }
}
