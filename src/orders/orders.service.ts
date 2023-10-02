import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OrderItem } from './entities/orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, customerId,taxPerctange } = createOrderDto;
    // const productIds = items?.map(({ productId }) => productId);
    // console.log('productIds', productIds);
    // const products = await this.productsRepository
    //   .createQueryBuilder('Product')
    //   .where({
    //     productId: In(productIds),
    //   })
    //   .printSql()
    //   .execute();
    // // let retrivedProrduct = {};
    // // (
    // //   await this.productsRepository.findBy({
    // //     productId: In(productIds),
    // //   })
    // // )?.map((item) => {
    // //   console.log('Retrived Ite',item)
    // //   retrivedProrduct = {
    // //     ...retrivedProrduct,
    // //     [item.productId]: retrivedProrduct,
    // //   };
    // // });
    // console.log(
    //   'retrivedProrduct',
    //   products,
    //   await this.productsRepository.find(),
    // );
    // return;
    // let grandTotal = 0;
    // const order = new Order();
    // order.customerId = customerId;
    // order.grandTotal = grandTotal + 5;
    // order.taxPerctange = 5;
    // order.totalBeforeTax = grandTotal;
    // this.ordersRepository.save(order);

    // order.items = retrivedItemsForSelectedItem;
    // console.log('order',order)
    // this.ordersRepository.save(order);

    //this.orderItemRepository.save(retrivedItemsForSelectedItem);
    // console.log('order', order);
    // return this.ordersRepository.save(order);
    //createOrderDto.items = items;
    //return this.ordersRepository.create(createOrderDto);
    //console.log('createOrderDto', createOrderDto);

    //return this.ordersRepository.save(createOrderDto);

    const customer = await this.customersRepository.findOneBy({ customerId });
    const productId = 1;
    const testProduct: Product[] = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.productId = :productId', { productId })
      .execute();
    console.log(
      'testProduct',
      testProduct,
      await this.productsRepository.find(),
    );
    const order = new Order();
    let grandTotal = 0;
    order.customerId = customer;
    order.taxPerctange = taxPerctange;
    const retrivedItemsForSelectedItem = await Promise.all(
      items?.map(async (pItem) => {
        const product: Product = await this.productsRepository.findOneBy({
          productId: pItem.productId,
        });
        const processedItem = new OrderItem();
        processedItem.cost = pItem.quantity * product?.productSellingPrice;
        processedItem.productId = product;
        //  processedItem.orderId = order;
        processedItem.quantity = pItem.quantity;
        grandTotal = grandTotal + pItem.quantity * product?.productSellingPrice;
        return processedItem;
      }),
    );
    //this.orderItemRepository.save(retrivedItemsForSelectedItem);
    order.totalBeforeTax = grandTotal;
    order.items = retrivedItemsForSelectedItem;
    order.grandTotal = grandTotal + (order.taxPerctange / 100) * grandTotal;
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: {
        items: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, UpdateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
