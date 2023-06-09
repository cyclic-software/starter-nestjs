import { Injectable, NotAcceptableException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from 'src/user/schema/user.schema';
import express, { Response } from 'express';
import { DriverDocument, DriverModel } from 'src/driver/schema/driver.schema';
import { AdminDocument, AdminModel } from './schema/admin.schema';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UpdateDriverStatusDto } from 'src/driver/dto/update-driver-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(AdminModel.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(DriverModel.name)
    private readonly driverModel: Model<DriverDocument>,
  ) {}

  async login(loginDto, @Res() res: Response) {
    try {
      const { username } = loginDto;
      const admin = await this.adminModel.findOne({
        username,
      });

      if (admin) {
        res.redirect('/admin/users');
      } else {
        res.redirect('/admin?error=Email not found');
      }
    } catch (error) {
      throw error;
    }
  }

  async afterLogin(@Res() res: Response, req, loginDto) {
    try {
      console.log('body', req.body);

      if (req.body.username && req.body.password) {
        res.redirect('/admin/users');
      } else {
        res.redirect('/admin?error=Email or password is wrong');
      }
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminModel.findOne({ username: username });
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log('user', user);
    console.log('passwordValid', passwordValid);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      console.log('hiiii');
      return {
        userId: user.id,
        username: user.username,
      };
    }
    return null;
  }

  async registerAdmin(dto) {
    const saltOrRounds = 10;
    console.log('dto', dto);
    const password = await bcrypt.hash(dto.password, saltOrRounds);
    const username = dto.username.toLowerCase();

    const admin = await this.adminModel.create({
      username,
      password,
    });
    return admin;
  }

  async allUsers(req) {
    try {
      const users = await this.userModel.find().sort({ _id: -1 });
      const customer = req.route.path;
      const pathArr = req.route.path.split('/');
      return { users, customer: 'customers' };
    } catch (error) {
      throw error;
    }
  }

  // async allDrivers(req, query) {
  //   try {
  //     const users = await this.driverModel.find().sort({ _id: -1 });
  //     // const partner = req.route.path;
  //     // const pathArr = req.route.path.split('/');
  //     return { users, partner: 'partners' };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async allDrivers(req, query) {
  //   try {
  //     if (query.firstName) {
  //       const firstName = query.firstName
  //         ? {
  //             firstName: {
  //               $regex: query.firstName,
  //               $options: 'i',
  //             },
  //           }
  //         : {};
  //       const users = await this.driverModel
  //         .find({ ...firstName })
  //         .sort({ _id: -1 });
  //       return { users, partner: 'partners' };
  //     } else if (query.lastName) {
  //       const lastName = query.lastName
  //         ? {
  //             lastName: {
  //               $regex: query.lastName,
  //               $options: 'i',
  //             },
  //           }
  //         : {};
  //       const users = await this.driverModel
  //         .find({ ...lastName })
  //         .sort({ _id: -1 });
  //       return { users, partner: 'partners' };
  //     } else if (query.userId) {
  //       const userId = new ObjectId(query.userId);

  //       const users = await this.driverModel
  //         .find({ _id: userId })
  //         .sort({ _id: -1 });
  //       return { users, partner: 'partners' };
  //     } else {
  //       const users = await this.driverModel.find().sort({ _id: -1 });
  //       return { users, partner: 'partners' };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async allDrivers(req, query) {
    try {
      if (query.search) {
        const users = await this.driverModel
          .find({
            $expr: {
              $regexMatch: {
                input: {
                  $concat: ['$firstName', ' ', '$lastName', ' ', '$email'],
                },
                regex: query.search,
                options: 'i',
              },
            },
          })
          .sort({ _id: -1 });
        return { users, partner: 'partners' };
      } else {
        const users = await this.driverModel.find().sort({ _id: -1 });
        const baseUrl = `${req.protocol}://${req.get('Host')}`;
        return { users, partner: 'partners', baseUrl };
      }
    } catch (error) {
      throw error;
    }
  }

  async driverStatus(updateDriverStatusDto: UpdateDriverStatusDto) {
    try {
      const userId = new ObjectId(updateDriverStatusDto.id);
      const driver = await this.driverModel.findById({ _id: userId });
      driver.status = updateDriverStatusDto.status;
      await driver.save();
      return { msg: 'driver status updated succesfully' };
    } catch (error) {
      throw error;
    }
  }

  async driverFilter(req, query) {
    try {
      // const order = query.order;
      // console.log('order', order);
      // const columns = query.columns;
      // console.log('columns', columns);
      // const orderBy = columns[0]['column']['name'];
      // console.log('columns', columns);
      // const orderDir = order[0]['dir'];
      // if (query) {
      //   const search = query.search;
      //   const data = await this.driverModel
      //     .find({
      //       $expr: {
      //         $regexMatch: {
      //           input: {
      //             $concat: ['$firstName', ' ', '$lastName', ' ', '$email'],
      //           },
      //           regex: search,
      //           options: 'i',
      //         },
      //       },
      //     })
      //     .sort({ _id: -1 });
      //   // const recordsTotal = data->count();
      //   console.log('data', data);
      //   return {
      //     draw: req.draw,
      //     recordsTotal: 10,
      //     recordsFiltered: data,
      //     data,
      //   };
      // } else {
      //   const data = await this.driverModel.find().sort({ _id: -1 });
      //   return { draw: req.draw, recordsTotal: 10, recordsFiltered: 10, data };
      // }

      const data = await this.driverModel.find().sort({ _id: -1 });

      const dataMap = async () => {
        const data2 = data.map((val, index) => {
          const id = data[index]._id;
          console.log('id', data[index]._id);
          const modifiedDoc = val.toObject();
          const action =
            '<select class="p-1 reject-approve-status"> <option value="APPROVED">Approve</option> <option value="REJECTED">Reject</option> </select> <button class="ml-2 btn btn-outline-danger btn-sm submitbtn" onclick="change(this)" value="' +
            id +
            '" link ="">Submit</button>';
          const view =
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg"> <path d="M10 4.375C3.75 4.375 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C16.25 15.625 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>';

          return { ...modifiedDoc, action, view };
        });
        return {
          draw: req.draw,
          recordsTotal: await this.driverModel.count(),
          recordsFiltered: await this.driverModel.count(),
          data: data2,
        };
      };
      return dataMap();
    } catch (error) {
      throw error;
    }
  }
}
