import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare class TypeormService implements TypeOrmOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>;
}
