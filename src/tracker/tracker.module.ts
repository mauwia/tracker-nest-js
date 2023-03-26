import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracker, TrackerSchema } from './schema/tracker.schema';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { UserModule } from 'src/user/user.module';
import { winstonProvider } from 'src/providers/winston.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tracker.name, schema: TrackerSchema }]),
    UserModule,
  ],
  providers: [TrackerService,winstonProvider],
  controllers: [TrackerController],
})
export class TrackerModule {}
