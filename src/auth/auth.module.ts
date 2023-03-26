import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { LocalUserStrategy } from './strategy/localUser.auth';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalSuperUserStrategy } from './strategy/localSuperUser.auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    AuthService,
    LocalUserStrategy,
    LocalSuperUserStrategy,
    JwtStrategy,
  ],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],

  controllers: [AuthController],
})
export class AuthModule {}
