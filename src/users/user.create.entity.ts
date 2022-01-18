import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 16, nullable: true })
  from: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 16 })
  to: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  reason: string;
}
