import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findOne(username: string): Promise<UserEntity>;
}
