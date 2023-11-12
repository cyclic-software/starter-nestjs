import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectBrowser } from 'nest-puppeteer';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OrderItem } from './entities/orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import puppeteer from 'puppeteer';
import type { Browser } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>, //@InjectBrowser() private readonly browser: Browser
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, customerId, taxPerctange } = createOrderDto;
    let orderProductMap = {};
    const itemIds = items?.map((i) => {
      orderProductMap = {
        ...orderProductMap,
        [i.productId as unknown as number]: { ...i },
      };
      return i.productId;
    });
    const customer = await this.customersRepository.preload({ customerId });
    const retriveOrderProducts = await this.productsRepository.findBy({
      productId: In(itemIds),
    });
    const order = new Order();
    order.customerId = customer;
    order.taxPerctange = taxPerctange;
    let grandTotal = 0;
    const retrivedItemsForSelectedItem = retriveOrderProducts?.map((i) => {
      const processedItem = new OrderItem();
      const itemQuantity = orderProductMap[i.productId].quantity;
      const itemCost = itemQuantity * i?.productSellingPrice;
      processedItem.pricePerUnit = i?.productSellingPrice;
      processedItem.productId = i;
      processedItem.quantity = itemQuantity;
      grandTotal = grandTotal + itemCost;
      return processedItem;
    });
    order.totalBeforeTax = grandTotal;
    order.items = retrivedItemsForSelectedItem;
    order.grandTotal = grandTotal + (taxPerctange / 100) * grandTotal;
    return this.ordersRepository.save(order);
  }

  findAll(page, where): Promise<[Order[], number]> {
    const { pageSize, pageIndex } = page;
    return this.ordersRepository.findAndCount({
      relations: {
        items: true,
        customerId: true,
      },
      skip: pageSize * pageIndex,
      take: pageSize,
      order: {
        createdDate: 'DESC',
      },
      where,
    });
  }

 

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: {
        orderId: id,
      },
      relations: {
        items: true,
        customerId: true,
      },
    });
  }
  


  async downloadOrderPDF(id: number): Promise<Buffer> {
    console.log('Hiting the PATH for PDF');
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '',
    });
    const page = await browser.newPage();
    const downloadUrlPath = process.env.FRONT_END_PATH + '/pdf/order/' + id;
    console.log('downloadUrlPath', downloadUrlPath);
    await page.goto(downloadUrlPath, {
      waitUntil: 'networkidle0',
    });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });
    console.log('PDF Has been open and ready for serve', buffer);
    return buffer;
  }

  async update(orderId: number, updateOrder: any) {
    console.log('Update Order', orderId, updateOrder);
    //return null
    const orderItem = await this.ordersRepository.findOne({
      where: {
        orderId: orderId,
      },
      relations: {
        items: true,
        customerId: true,
      },
    });
    // const {items} = orderItem;
    // const {items:updateItems} = updateOrder;
    Object.assign(orderItem, updateOrder);
    //console.log('Update Order after merge', orderItem);
    return this.ordersRepository.save(orderItem);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
