import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
enum Type {
  EXPENSE = 'expense',
  INCOME = 'income',
}
@Schema()
export class Tracker {
  @Prop()
  category: string;
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;
  @Prop()
  source: string;
  @Prop()
  amount: number;
  @Prop({ enum: Type })
  type: string;
  @Prop({ default: Date.now() })
  timestamp: string;
}

export const TrackerSchema = SchemaFactory.createForClass(Tracker);
