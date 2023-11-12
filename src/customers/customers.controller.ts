import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { pageIndex, pageSize, ...where } = query;
    const page = { pageIndex, pageSize };
    return this.customersService.findAll(page,where);
  }

  @Get('/search/:searchKey')
  search(@Param('searchKey') searchKey: string) {
    return this.customersService.findByNameOrMobileNumber(searchKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Get(':id/orders')
  findOrdersForCustomerId(@Param('id') id: number, @Query() query) {
    const { pageIndex, pageSize, ...where } = query;
    const page = { pageIndex, pageSize };
    return this.customersService.findAllOrdersByCustomerId(id, page, where);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
