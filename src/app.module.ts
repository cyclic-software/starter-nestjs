import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1.1 Import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // 2.1 Import the product module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
//import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://johbirger:xqUNGRzd8j92cMe4@cluster0.ddwvlsd.mongodb.net/'), // 1.2 Setup the database
    //ConfigModule.forRoot(), //for gcloud
    ProductModule, UserModule, AuthModule, CartModule, // 2.2 Add the product module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
