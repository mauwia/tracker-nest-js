import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Inject
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TRACKERMODULE } from 'src/utils/constant.util';
import { Logger } from 'winston';
import { addEntryDto } from './dto/addEntry.dto';
import { TrackerService } from './tracker.service';

@ApiTags('Tracker')
@ApiBearerAuth('JWT-auth')
@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService, @Inject('winston') private readonly logger: Logger) {}
  @Post('addEntry')
  @UseGuards(AuthGuard('jwt'))
  async addEntry(@Body() body: addEntryDto, @Req() req) {
    this.logger.info(`Recieved Payload:[${JSON.stringify(body)}]`,TRACKERMODULE)
    return this.trackerService.addEntry(req.user.username, body);
  }
  @Get('getEntries')
  @UseGuards(AuthGuard('jwt'))
  async getEntries(@Req() req) {
    this.logger.info(`Recieved Payload:[]`,TRACKERMODULE)
    return this.trackerService.getEntries(req.user.userId);
  }
  @ApiParam({
    example: 'day,week,month,year',
    name: 'range',
  })
  @Get('getSummary/:range')
  @UseGuards(AuthGuard('jwt'))
  async getSummary(@Req() req, @Param('range') range: string) {
    this.logger.info(`Recieved Payload:[${range}]`,TRACKERMODULE)
    return this.trackerService.getEntriesSummary(req.user.userId, range);
  }
}
