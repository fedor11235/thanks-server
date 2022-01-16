import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { Userinterface } from './user.interface'
import { CreateUserDto } from './user.dto'


import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('list')
    @ApiResponse({
        status:200, 
        description:"All users on this page", 
        type:CreateUserDto
    })
    async findAll(@Param('id') id:String, @Param('perPage') perPage:String): Promise<void> {
        console.log(id, perPage)
        // return this.usersService.findAll()
    }

    @Post('add')
    @ApiResponse({
        status:200, 
        description:"Create User", 
        type:CreateUserDto
    })
    @ApiBody({type:CreateUserDto})
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto)
    }
}