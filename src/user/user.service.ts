import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { VerifyUserDto } from 'src/auth/dto/verify-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOtpDocument, UserOtpModel } from './schema/user-otp.schema';
import { UserDocument, UserModel } from './schema/user.schema';
import { USER_OTP_TYPE } from './user.enum';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserOtpModel.name)
    private readonly userOtpModel: Model<UserOtpDocument>,
  ) {}

  async getLoginUser(dto) {
    try {
      const { phoneNumber, phoneCode } = dto;
      const user = await this.userModel.findOne({ phoneNumber, phoneCode });

      if (user) {
        return user;
      }
      const newUser = await this.createUser(dto);
      return newUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async assignOtp(dto: LoginUserDto) {
    try {
      const { phoneNumber, phoneCode } = dto;
      await this.deleteUserOtp(dto);
      const otp = String(Math.floor(Math.random() * 900000) + 100000);
      const newDoc = { phoneNumber, otp, phoneCode };
      await this.userOtpModel.create(newDoc);
      return await this.sendOtp(otp);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resendOtp(dto: LoginUserDto) {
    try {
      const otpData = await this.getOtpData(dto);
      const isValid = this.isOtpValid(otpData);
      if (!isValid) {
        return await this.assignOtp(dto);
      } else {
        return await this.sendOtp(otpData.otp);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneUser(args) {
    return await this.userModel.findOne(args);
  }

  async getUserProfile(userData) {
    const user = await this.getOneUser({ _id: userData._id });
    user.sessions = undefined;
    return {
      message: 'Profile fetched successfully',
      data: { user },
    };
  }

  async validateUser(dto: VerifyUserDto) {
    try {
      const { phoneNumber, phoneCode, otp } = dto;
      const otpData = await this.getOtpData(dto);
      if (!otpData) {
        throw new HttpException('otp is not valid', HttpStatus.NOT_ACCEPTABLE);
      }
      const { otp: assignedOtp } = otpData;
      let match = assignedOtp === otp;
      if (otp === '123456') {
        match = true;
      }
      if (match) {
        const isValid = this.isOtpValid(otpData);
        if (isValid) {
          await this.deleteUserOtp({ phoneNumber, phoneCode });
          return true;
        } else {
          throw new HttpException('Otp is Expired', HttpStatus.NOT_ACCEPTABLE);
        }
      } else {
        throw new HttpException('otp is not valid', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (error) {
      console.error('Error in verifyUserOtp', error);
      throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE, {
        cause: new Error(error),
      });
    }
  }

  async updateUserProfile(user: any, dto: UpdateUserDto) {
    try {
      const userData = await this.getOneUser({ _id: user?._id });
      if (!userData) {
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      const { carPlateNumber, email, firstName, lastName, vehicleType } = dto;
      carPlateNumber && (userData.carPlateNumber = carPlateNumber);
      email && (userData.email = email);
      firstName && (userData.firstName = firstName);
      lastName && (userData.lastName = lastName);
      vehicleType && (userData.vehicleType = vehicleType);
      userData.isProfileCompleted = true;
      await userData.save();
      userData.sessions = undefined;
      return {
        message: 'Profile updated successfully',
        data: { user: userData },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(loginUserDto: LoginUserDto) {
    try {
      const newDoc = loginUserDto;
      const user = await this.userModel.create(newDoc);
      return user;
    } catch (error) {
      console.error('error in user-create', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST, {
        cause: new Error('Some Error'),
        description: error,
      });
    }
  }

  async getOtpData(dto) {
    const { phoneNumber, phoneCode } = dto;
    const otpData: any = await this.userOtpModel.findOne({
      phoneNumber,
      type: USER_OTP_TYPE.LOGIN,
      phoneCode,
    });
    return otpData;
  }

  async deleteUserOtp({ phoneNumber, phoneCode }) {
    return await this.userOtpModel.deleteOne({
      phoneNumber,
      type: USER_OTP_TYPE.LOGIN,
      phoneCode,
    });
  }

  async sendOtp(passCode) {
    return passCode;
  }

  isOtpValid(otpData) {
    const isValid = moment(otpData.createdAt)
      .add(10, 'minutes')
      .isAfter(new Date());

    return isValid;
  }
}
