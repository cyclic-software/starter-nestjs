import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePromotionalDto } from './dto/create-promotional.dto';
import { PromotionalService } from './promotional.service';

@Controller('promotional')
export class PromotionalController {
  constructor(private readonly promotionalService: PromotionalService) {}

  @Post()
  create(@Body() createPromotionalDto: CreatePromotionalDto) {
    return this.promotionalService.create(createPromotionalDto);
  }

  @Get()
  findAll() {
    return this.promotionalService.getPromotional();
  }

  @Get('verify')
  verify(@Query('code') code: string) {
    return this.promotionalService.verifyPromotional({ code });
  }
}
