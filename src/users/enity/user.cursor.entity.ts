import { Entity, Column, PrimaryColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { RequestUserDto } from '../dto/user.request.dto'

@Entity()
export class Cursor {
    @ApiProperty()
    @PrimaryColumn()
    id: String

    @ApiProperty()
    @Column({ type: "int"})
    page: Number

    @ApiProperty()
    @Column({ type: "int"})
    perPage: Number

    @ApiProperty()
    @Column()
    cursor: String

}