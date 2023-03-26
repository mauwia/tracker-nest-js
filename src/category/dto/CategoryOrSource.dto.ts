import { ApiProperty } from '@nestjs/swagger';

export class CategoryOrSourceDTO {
  @ApiProperty()
  category: string;
  @ApiProperty()
  source: string;
}
