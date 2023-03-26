import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Logger } from 'winston';
import { USERMODULE } from '../utils/constant.util';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject('winston') private readonly logger: Logger
  ) { }
  async createUser(body) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
      let newUser = new this.userModel({
        username: body.username,
        password: hashedPassword,
        isSuper: body.isSuper || false,
      });
      this.logger.info(`Create User in DB`, USERMODULE)
      return this.userModel.create(newUser);
    } catch (error) {
      this.logger.error(error.message, USERMODULE)
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getUser(query) {
    try {
      this.logger.info(`Retrieving from DB`, USERMODULE)
      return this.userModel.findOne(query);
    } catch (error) {
      this.logger.error(error.message, USERMODULE)

      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getUsers(isSuper) {
    try {
      if (!isSuper) {
        this.logger.error("Unauthorized", USERMODULE)
        throw { message: 'Unauthorized', status: HttpStatus.UNAUTHORIZED };
      }
      this.logger.info(`Retrieving from DB`, USERMODULE)
      return this.userModel.find({});
    } catch (error) {
      this.logger.error(error.message, USERMODULE)
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
