import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalSuperUserStrategy extends PassportStrategy(
  Strategy,
  'SuperUser',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateSuperUser(username, password);
      if (!user) {
        throw { message: 'Unauthorized', status: HttpStatus.UNAUTHORIZED };
      }
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
}
