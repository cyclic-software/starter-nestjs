import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports:[UsersService],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule { }
