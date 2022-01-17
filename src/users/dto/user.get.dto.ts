import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  nextCursor: string;

  @ApiProperty()
  items: Array<any>;
}
