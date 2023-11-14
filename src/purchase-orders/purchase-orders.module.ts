import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';

@Module({
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService]
})
export class PurchaseOrdersModule {}
