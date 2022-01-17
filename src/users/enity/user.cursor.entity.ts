import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RequestUserDto } from '../dto/user.request.dto';

@Entity()
export class Cursor {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'int' })
  page: number;

  @ApiProperty()
  @Column({ type: 'int' })
  perPage: number;

  @ApiProperty()
  @Column({ nullable: true })
  cursor: string;
}
