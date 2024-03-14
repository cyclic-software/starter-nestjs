import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


@Injectable()
export class TypeormService implements TypeOrmOptionsFactory{
    
     constructor(){

     }
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port:  Number(process.env.DB_PORT),
            username:  process.env.DB_USERNAME,
            password:  process.env.DB_PASSWORD,
            database:  process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize: true,
            logging: true
        }
    }
    
 }
