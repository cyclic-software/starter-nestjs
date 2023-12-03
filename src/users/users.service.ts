import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/interface/email.interface';
import { FileInterface } from './interface/file.interface';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly emailSerice: EmailService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    file: FileInterface,
  ): Promise<Users> {
    const users = await this.findByEmail(createUserDto.email);
    if (users) throw new BadRequestException('Email Already Exists!');

    const data = { ...createUserDto };
    const pwdInput = data.password;
    data.path = file.path;
    data.filename = file.filename;
    data.mimetype = file.mimetype;
    const pwdHash = await this.hashPassword(data.password);
    data.password = pwdHash;

    const save = await this.usersRepository.save(data);

    const payload: Email = {
      to: data.email,
      password: pwdInput,
    };
    await this.emailSerice.sendWelcomeEmail(payload);

    if (!save)
      throw new HttpException(
        'Error while save data karyawan',
        HttpStatus.BAD_GATEWAY,
      );

    return save;
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find({});
  }

  async findOne(id: number): Promise<Users> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<Users> {
    const data = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email=:email', { email: email })
      .getOne();

    return data;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: FileInterface,
  ): Promise<UpdateResult> {
    const user = await this.findOne(id);
    if (user.path) {
      const pathFile = join(process.cwd(), user.path);
      await this.deleteFile(pathFile);
    }

    const data = { ...updateUserDto };
    data.filename = file?.filename;
    data.mimetype = file?.mimetype;
    data.path = file?.path;

    return await this.usersRepository.update(id, data);
  }

  async deleteFile(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async getMe(user: any) {
    const data = await this.usersRepository.findOne({ where: { id: user.id } });
    return data;
  }
}
