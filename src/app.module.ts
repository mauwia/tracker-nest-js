import { Module,Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TrackerModule } from './tracker/tracker.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import { initWinston } from './utils/winston.utils';
import { winstonProvider } from './providers/winston.provider';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [   
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
     process.env.MDB_URL,
    ),
    UserModule,
    AuthModule,
    TrackerModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService,winstonProvider],
})
export class AppModule { }
