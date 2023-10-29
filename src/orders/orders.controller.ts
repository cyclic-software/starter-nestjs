import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { createReadStream } from 'fs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.ordersService.findAll({ pageIndex, pageSize });
  }

  @Get(':id/pdf')
  @Header('Content-Type', 'application/pdf')
  async downloadPDF(@Param('id') id: number) {
    const buffer: Buffer = await this.ordersService.downloadOrderPDF(id);
    return new StreamableFile(buffer);

    // res.set({
    //   // pdf
    //   'Content-Type': 'application/pdf',
    //   'Content-Disposition': 'attachment; filename=invoice.pdf',
    //   'Content-Length': buffer.length,

    //   // prevent cache
    //   'Cache-Control': 'no-cache, no-store, must-revalidate',
    //   Pragma: 'no-cache',
    //   Expires: 0,
    // });

    // // res.end(buffer)

    // res.set({
    //   'Content-Type': 'application/pdf',
    //   'Content-Disposition': 'attachment; filename=invoice.pdf',
    //   'Content-Length': buffer.length,

    //   // prevent cache
    //   'Cache-Control': 'no-cache, no-store, must-revalidate',
    //   Pragma: 'no-cache',
    //   Expires: 0,
    // })

    // return buffer;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('Update order hit tho');
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
