import { Injectable } from '@nestjs/common';
import { CreateIjinDto } from './dto/create-ijin.dto';
import { UpdateIjinDto } from './dto/update-ijin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ijin } from './entities/ijin.entity';
import { Repository } from 'typeorm';
import { FileInterface } from 'src/users/interface/file.interface';
import { StatusIjin } from './interface/status-ijin.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IjinService {
  constructor(
    @InjectRepository(Ijin)
    private readonly ijinRepo: Repository<Ijin>,
    private readonly userService: UsersService,
  ) {}
  async create(
    userId: number,
    createIjinDto: CreateIjinDto,
    file: FileInterface,
  ) {
    const user = await this.userService.findOne(userId);
    const data = { ...createIjinDto };
    data.users = user;
    data.path = file?.path;
    data.filename = file?.filename;
    data.mimetype = file?.mimetype;
    return await this.ijinRepo.save(data);
  }

  async getByUsers(idUsers: number) {
    const users = await this.userService.findOne(idUsers);

    const data = await this.ijinRepo
      .createQueryBuilder('ijin')
      .leftJoin('ijin.users', 'users')
      .where('users.id=:id', { id: idUsers })
      .getMany();

    if (data.length === 0) return [];

    const combine = {
      ...users,
      ijin: data,
    };

    return combine;
  }

  async getCountingStatusIjin(idUser: number) {
    const data = this.ijinRepo
      .createQueryBuilder('ijin')
      .leftJoinAndSelect('ijin.users', 'users')
      .where('users.id=:id', { id: idUser });

    const pending = await data
      .andWhere(`status=:status`, { status: StatusIjin.PENDING })
      .getCount();
    const approve = await data
      .andWhere(`status=:status`, { status: StatusIjin.APPROVE })
      .getCount();
    const reject = await data
      .andWhere(`status=:status`, { status: StatusIjin.REJECT })
      .getCount();

    return {
      pending: pending,
      approve: approve,
      reject: reject,
    };
  }

  async findAll() {
    return await this.ijinRepo.find({});
  }

  async findOne(id: number) {
    return await this.ijinRepo.findOne({
      where: { id: id },
      relations: ['users'],
    });
  }

  async update(id: number, updateIjinDto: UpdateIjinDto, file: FileInterface) {
    const data = { ...updateIjinDto };
    data.path = file?.path;
    data.filename = file?.filename;
    data.mimetype = file?.mimetype;
    return await this.ijinRepo.update(id, data);
  }

  async remove(id: number) {
    return await this.ijinRepo.delete(id);
  }
}
