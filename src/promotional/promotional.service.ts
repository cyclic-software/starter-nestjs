import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromotionalDto } from './dto/create-promotional.dto';
import {
  PromotionalDocument,
  PromotionalModel,
} from './schema/promotional.schema';

import * as moment from 'moment';

@Injectable()
export class PromotionalService {
  constructor(
    @InjectModel(PromotionalModel.name)
    private readonly promotionModel: Model<PromotionalDocument>,
  ) {}
  async create(createPromotionalDto: CreatePromotionalDto) {
    try {
      const newDoc = { ...createPromotionalDto };
      newDoc['code'] = newDoc['code'].toLowerCase();
      const promotional = await this.promotionModel.create(newDoc);
      return {
        message: 'Promotional created successfully',
        data: { promotional },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getPromotional() {
    try {
      const promotional = await this.promotionModel.find();

      return {
        message: 'Promotional List',
        data: { promotional },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPromotional(filter: any) {
    try {
      const filterData = { ...filter };
      if (filterData?.['code']) {
        filterData['code'] = filterData['code'].toLowerCase();
      }
      const promotional = await this.promotionModel.findOne(filterData);

      if (!promotional) {
        return {
          message: '*Code has expired / Code is invalid',
          data: null,
        };
      }

      const isValid = this.isPromotionalValid(promotional);

      if (!isValid) {
        return {
          message: '*Code has expired / Code is invalid',
          data: null,
        };
      }

      return {
        message: 'Promo code has been applied. ',
        data: { promotional },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  isPromotionalValid(promotionalData) {
    const isValid = moment(promotionalData.expiredAt).isAfter(new Date());

    return isValid;
  }
}
