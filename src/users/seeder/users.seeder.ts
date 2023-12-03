import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersSeeders {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async seedUsers(): Promise<void> {
    const existingUsers = await this.userRepository.find({});

    if (existingUsers.length === 0) {
      const usersData = new Users();
      usersData.name = 'admin';
      usersData.nik = '001';
      usersData.email = this.configService.getOrThrow('ADMIN_EMAIL');
      const password = await this.userService.hashPassword(
        this.configService.getOrThrow('ADMIN_PASSWORD'),
      );
      usersData.password = password;
      usersData.phone = '+6281334234123';
      usersData.position = 'admin';

      await this.userRepository.save(usersData);
    }
  }
}
