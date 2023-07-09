import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO.password.length < 8){
      throw new Error('Password must be atleast 8 characters');
    }
    const newUser = await this.userModel.create(createUserDTO);
    
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.roles.push(Role.User);
    return newUser.save();
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email: email});
    return user;
  }
}