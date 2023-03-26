import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Put,
  UseGuards,
  Inject
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { WinstonModule } from 'nest-winston';
import { Logger } from 'winston';
import { USERMODULE } from '../utils/constant.util';
import { UserService } from './user.service';
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, @Inject('winston') private readonly logger: Logger) { }
  @UseGuards(AuthGuard('jwt'))
  @Get('/getUsers')
  async getAllUsers(@Req() req) {
    this.logger.info("Controller",USERMODULE)
    this.logger.info(`Recieved Payload:[]`,USERMODULE)
    return this.userService.getUsers(req.user.isSuper);
  }
}
