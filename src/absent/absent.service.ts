import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAbsentDto } from './dto/create-absent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Absent } from './entities/absent.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import * as moment from 'moment';
import { Type } from './dto/type.enum';
import { FileInterface } from 'src/users/interface/file.interface';

@Injectable()
export class AbsentService {
  constructor(
    @InjectRepository(Absent)
    private readonly absenRepo: Repository<Absent>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createAbsentDto: CreateAbsentDto,
    user: any,
    type: Type,
    file: FileInterface,
  ) {
    if (type === Type.IN) {
      const validation = await this.validationAbsent(user.id, Type.IN);
      if (validation)
        throw new BadRequestException(
          `Hari ini Anda Sudah Absen Masuk pada Jam ${validation.time}`,
        );
    }
    if (type === Type.OUT) {
      const validation = await this.validationAbsent(user.id, Type.OUT);
      if (validation)
        throw new BadRequestException(
          `Terima kasih, Anda telah melakukan check-out pada Jam ${validation.time}`,
        );
    }

    const data = { ...createAbsentDto };
    data.filename = file?.filename;
    data.path = file?.path;
    data.mimetype = file?.mimetype;
    const userData = await this.userService.findOne(Number(user.id));
    data.users = userData;

    const currentTime = moment().format('HH:mm:ss');
    data.time = currentTime;
    data.type = type;

    return await this.absenRepo.save(data);
  }

  async findOne(id: number): Promise<Absent> {
    const result = await this.absenRepo.findOne({ where: { id: id } });
    return result;
  }

  async findByIdandType(id: number, type: string) {
    const data = await this.absenRepo
      .createQueryBuilder('absent')
      .where('type=:type', { type: type })
      .andWhere('id=:id', { id: id })
      .getOne();

    return data;
  }

  async validationAbsent(idUsers: any, type: Type) {
    const currentDate = moment().format('YYYY-MM-DD');

    const data = await this.absenRepo
      .createQueryBuilder('absent')
      .select([
        `to_char(absent.date, 'YYYY-MM-DD') as date_absent`,
        `users.id as usersId`,
        `absent.time as time`,
      ])
      .leftJoin('absent.users', 'users')
      .where('users.id=:idUsers', { idUsers: idUsers })
      .andWhere(`to_char(absent.date, 'YYYY-MM-DD')=:currentDate`, {
        currentDate: currentDate,
      })
      .andWhere(`absent.type=:type`, { type: type })
      .getRawOne();

    return data;
  }

  async detail(idAbsent: number) {
    const data = await this.absenRepo.findOne({
      where: { id: idAbsent },
      relations: ['users'],
    });
    return data;
  }

  async getByUsers(idUsers: number) {
    const user = await this.userService.findOne(idUsers);

    const absent = await this.absenRepo
      .createQueryBuilder('absent')
      .leftJoin('absent.users', 'users')
      .where('users.id=:idUsers', { idUsers: idUsers })
      .getMany();

    const combine = {
      ...user,
      absent: absent,
    };

    return combine;
  }
}
