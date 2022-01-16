import { ApiProperty } from '@nestjs/swagger'

export  class CreateUserDto {
    
    @ApiProperty({required:false})
    id: string

    @ApiProperty({required:false})
    from: string

    @ApiProperty()
    to: string

    @ApiProperty({required:false})
    reason: string
}