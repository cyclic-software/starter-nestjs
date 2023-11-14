import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll({ pageSize, pageIndex }): Promise<[Product[], number]> {
    return this.productsRepository.findAndCount({
      skip: pageSize * pageIndex,
      take: pageSize,
    });
  }

  findByName(searchKey: string) {
    return this.productsRepository.find({
      where: [
        {
          productName: ILike('%' + searchKey + '%'),
        },
      ],
      take: 5,
    });
  }

  findOne(productId: number) {
    return this.productsRepository.findOneBy({ productId });
  }

  update(productId: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update({ productId }, updateProductDto);
  }

  remove(productId: number) {
    return this.productsRepository.softDelete({ productId });
  }
}
