import { Product } from "src/products/entities/product.entity";

export class CreateOrderItemDto {
  productId: number;
  quantity: number;
  productSellingPrice: number;
}