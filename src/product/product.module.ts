import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import mongoose module
import { ProductSchema } from './schemas/product.schema'; // 2. Import product schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) // 3. Setup the mongoose module to use the product schema
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
