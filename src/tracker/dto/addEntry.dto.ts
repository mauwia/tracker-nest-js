import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';
enum Type {
  EXPENSE = 'expense',
  INCOME = 'income',
}
export class addEntryDto {
  @ApiProperty()
  category: string;
  @ApiProperty()
  source: string;
  @ApiProperty()
  amount: string;
  @ApiProperty({ enum: Type, example: 'expense || income' })
  type: Type;

}
