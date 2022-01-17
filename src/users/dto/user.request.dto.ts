import { ApiProperty } from '@nestjs/swagger'

export  class RequestUserDto {
    
    @ApiProperty({required:false})
    from?: String

    @ApiProperty()
    to: String

    @ApiProperty({required:false})
    reason?: String
}