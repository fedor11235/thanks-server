import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: String;

  @ApiProperty()
  @Column({ type: 'varchar', length: 16, nullable: true })
  from: String;

  @ApiProperty()
  @Column({ type: 'varchar', length: 16 })
  to: String;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  reason: String;
}
