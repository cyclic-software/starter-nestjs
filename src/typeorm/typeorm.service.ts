import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USERNAME } from 'src/config/constants';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory{
    
     constructor(private configService : ConfigService){

     }
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mysql',
            host: this.configService.get<string>(DB_HOST),
            port:  this.configService.get<number>(DB_PORT),
            username:  this.configService.get<string>(DB_USERNAME),
            password:  this.configService.get<string>(DB_PASSWORD),
            database:  this.configService.get<string>(DB_DATABASE),
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize: true,
            logging: true
        }
    }
    
 }
