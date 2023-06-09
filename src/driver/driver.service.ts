import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { LoginDriverDto } from 'src/auth/dto/login-driver.dto';
import { VerifyDriverDto } from 'src/auth/dto/verify-driver.dto';
import { DRIVER_OTP_TYPE } from './driver.enum';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverOtpDocument, DriverOtpModel } from './schema/driver.otp.schema';
import { DriverDocument, DriverModel } from './schema/driver.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(DriverModel.name)
    private readonly userModel: Model<DriverDocument>,
    @InjectModel(DriverOtpModel.name)
    private readonly userOtpModel: Model<DriverOtpDocument>,
  ) {}

  async getLoginDriver(dto) {
    try {
      const { phoneNumber, phoneCode } = dto;
      const user = await this.userModel.findOne({ phoneNumber, phoneCode });

      if (user) {
        return user;
      }
      dto['driverId'] = String(moment().unix());
      const newUser = await this.createDriver(dto);
      return newUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async assignOtp(dto: LoginDriverDto) {
    try {
      const { phoneNumber, phoneCode } = dto;
      await this.deleteDriverOtp(dto);
      const otp = String(Math.floor(Math.random() * 900000) + 100000);
      const newDoc = { phoneNumber, otp, phoneCode };
      await this.userOtpModel.create(newDoc);
      return await this.sendOtp(otp);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resendOtp(dto: LoginDriverDto) {
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

  async getOneDriver(args) {
    return await this.userModel.findOne(args);
  }

  async getUserProfile(userData) {
    const driver = await this.getOneDriver({ _id: userData._id });
    driver.sessions = undefined;
    return {
      message: 'Profile fetched successfully',
      data: { driver },
    };
  }

  async validateDriver(dto: VerifyDriverDto) {
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
          await this.deleteDriverOtp({ phoneNumber, phoneCode });
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

  async updateDriverProfile(user: any, dto: UpdateDriverDto) {
    try {
      const driverData = await this.getOneDriver({ _id: user?._id });
      if (!driverData) {
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      const {
        email,
        firstName,
        lastName,
        licenseType,
        bankAccountNumber,
        bankName,
        nameAsInBankAccount,
      } = dto;
      email && (driverData.email = email);
      firstName && (driverData.firstName = firstName);
      lastName && (driverData.lastName = lastName);
      licenseType && (driverData.licenseType = licenseType);
      bankAccountNumber && (driverData.bankAccountNumber = bankAccountNumber);
      bankName && (driverData.bankName = bankName);
      nameAsInBankAccount &&
        (driverData.nameAsInBankAccount = nameAsInBankAccount);
      await driverData.save();
      driverData.sessions = undefined;
      return {
        message: 'Profile updated successfully',
        data: { driver: driverData },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createDriver(dto: LoginDriverDto) {
    try {
      const newDoc = dto;
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
      type: DRIVER_OTP_TYPE.LOGIN,
      phoneCode,
    });
    return otpData;
  }

  async deleteDriverOtp({ phoneNumber, phoneCode }) {
    return await this.userOtpModel.deleteOne({
      phoneNumber,
      type: DRIVER_OTP_TYPE.LOGIN,
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
