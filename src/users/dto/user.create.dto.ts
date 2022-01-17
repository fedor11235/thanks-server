import { ApiProperty } from '@nestjs/swagger'

export  class CreateUserDto {
    
    @ApiProperty({required:false})
    id?: String

    @ApiProperty({required:false})
    from?: String

    @ApiProperty()
    to: String

    @ApiProperty({required:false})
    reason?: String
}