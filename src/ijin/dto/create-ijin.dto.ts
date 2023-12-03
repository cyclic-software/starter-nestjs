import { Users } from 'src/users/entities/user.entity';
import { TypeIjin } from '../interface/ijin.enum';

export class CreateIjinDto {
  title: string;
  type: TypeIjin;
  date_ijin: Date;
  description: string;
  status: string;
  notes: string;
  path: string;
  users: Users;
  filename: string;
  mimetype: string;
}
