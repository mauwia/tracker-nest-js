import { HttpException, HttpStatus, Injectable,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { TRACKERMODULE } from 'src/utils/constant.util';
import { Logger } from 'winston';
import { summaryAggregationQuery } from './queries/queries';
import { Tracker } from './schema/tracker.schema';

@Injectable()
export class TrackerService {
  constructor(
    @InjectModel(Tracker.name) private readonly trackerModel: Model<Tracker>,
    private readonly userService: UserService,
    @Inject('winston') private readonly logger: Logger
  ) {}
  async addEntry(username, body) {
    try {
      this.logger.info(`Retrieving from DB`, TRACKERMODULE)
      let user = await this.userService.getUser({
        $and: [
          { username },
          { categories: { $in: body.category } },
          { sources: { $in: body.source } },
        ],
      });
      if (!user) {
      this.logger.error('Category or Source Not Found', TRACKERMODULE)
        throw {
          message: 'Category or Source Not Found',
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }
      body.userId = user._id;
      this.logger.info(`Create Entry in DB`, TRACKERMODULE)
      let newEntry = new this.trackerModel(body);
      let entry = await this.trackerModel.create(newEntry);
      return entry;
    } catch (error) {
      this.logger.error(error.message, TRACKERMODULE)
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getEntries(userId) {
    try {
      this.logger.info(`Retrieving from DB`, TRACKERMODULE)
      let entries = await this.trackerModel.find({
        userId: new mongoose.Types.ObjectId(userId),
      });
      return entries;
    } catch (error) {
      this.logger.error(error.message, TRACKERMODULE)
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          msg: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getEntriesSummary(userId, range) {
    const startOfMonth = moment().startOf(range).unix().toString();
    const endOfMonth = moment().endOf(range).unix().toString();
    try {
      this.logger.info(`Retrieving from DB`, TRACKERMODULE)
      let entries = await this.trackerModel.aggregate(
        summaryAggregationQuery(startOfMonth, endOfMonth, userId),
      );
      return entries;
    } catch (error) {
      this.logger.error(error.message, TRACKERMODULE)
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
