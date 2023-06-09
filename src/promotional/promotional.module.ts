import { Module } from '@nestjs/common';
import { PromotionalService } from './promotional.service';
import { PromotionalController } from './promotional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionalModel } from './schema/promotional.schema';
import { PromotionalSchema } from './schema/promotional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromotionalModel.name, schema: PromotionalSchema },
    ]),
  ],
  controllers: [PromotionalController],
  providers: [PromotionalService],
  exports: [PromotionalService],
})
export class PromotionalModule {}
