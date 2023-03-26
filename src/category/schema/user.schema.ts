import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;
  @Prop({ default: false })
  isSuper: boolean;
  @Prop()
  password: string;
  @Prop()
  categories: string[];
  @Prop()
  sources: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
