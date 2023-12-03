import { Users } from 'src/users/entities/user.entity';
import { Type } from './type.enum';

export class CreateAbsentDto {
  time?: string;

  longlat?: string;

  description?: string;

  path?: string;

  filename?: string;

  mimetype?: string;

  type: Type;

  users: Users;
}
