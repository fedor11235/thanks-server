import { ApiProperty } from '@nestjs/swagger'
import { CreateUserDto } from './user.create.dto'

export  class GetUserDto {
    
    @ApiProperty()
    total: Number

    @ApiProperty()
    nextCursor: String

    @ApiProperty()
    items: CreateUserDto[]
}