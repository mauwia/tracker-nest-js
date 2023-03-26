import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { winstonProvider } from 'src/providers/winston.provider';
import { User, UserSchema } from './schema/user.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService,winstonProvider],
  exports: [CategoryService],
})
export class CategoryModule {}
