import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async addCategoryOrSource(username, body) {
    try {
      const categories = body.category ? [body.category] : [];
      const sources = body.source ? [body.source] : [];
      return this.userModel.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            categories: { $each: categories },
            sources: { $each: sources },
          },
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCategoryOrSource(username, body) {
    try {
      return this.userModel.findOneAndUpdate(
        { username },
        { $pull: { categories: body.category, sources: body.source } },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
