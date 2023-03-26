import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('User'))
  @Post('login')
  async login(@Request() req, @Body() body: UserDto) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  async createUser(@Body() body: UserDto) {
    return this.authService.createUser(body);
  }
  @UseGuards(AuthGuard('SuperUser'))
  @Post('superUserLogin')
  async superUserLogin(@Request() req, @Body() body: UserDto) {
    return this.authService.login(req.user);
  }
  // @Post('superUserSignup')
  // async superUserSignup(@Body() body: UserDto) {
  //   return this.authService.createUser({...body,isSuper:true});
  // }
}
