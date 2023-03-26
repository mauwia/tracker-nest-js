import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async createUser(body) {
    try {
      let user = await this.usersService.createUser(body);
      return user;
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
  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.getUser({ username });
      if (!user) return null;
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!user) {
        throw {
          message: 'could not find the user',
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }
      if (user && passwordValid) {
        return user;
      }
      return null;
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
  async validateSuperUser(username: string, password: string) {
    try {
      const user = await this.usersService.getUser({ username, isSuper: true });
      if (!user) return null;
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!user) {
        throw {
          message: 'could not find the user',
          status: HttpStatus.NOT_ACCEPTABLE,
        };
      }
      if (user && passwordValid) {
        return user;
      }
      return null;
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
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      isSuper: user.isSuper,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
