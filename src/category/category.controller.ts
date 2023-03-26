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
import { CategoryOrSourceDTO } from './dto/CategoryOrSource.dto';
import { CategoryService } from './category.service';
@ApiTags('Category')
@ApiBearerAuth('JWT-auth')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, @Inject('winston') private readonly logger: Logger) { }
  private USERMODULE = {moduleName:""}
 
  @UseGuards(AuthGuard('jwt'))
  @Put('/addCategoryOrSource')
  async addCategory(@Body() body: CategoryOrSourceDTO, @Req() req: any) {
    return this.categoryService.addCategoryOrSource(req.user.username, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/deleteCategoryOrSource')
  async deleteCategory(@Body() body: CategoryOrSourceDTO, @Req() req: any) {
    return this.categoryService.deleteCategoryOrSource(req.user.username, body);
  }
}
