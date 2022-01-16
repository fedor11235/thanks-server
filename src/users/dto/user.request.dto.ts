import { ApiProperty } from '@nestjs/swagger'

export  class RequestUserDto {
    


    @ApiProperty({required:false})
    from: string

    @ApiProperty()
    to: string

    @ApiProperty({required:false})
    reason: string
}