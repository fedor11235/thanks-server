import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { Userinterface } from './user.interface'
import { CreateUserDto } from './dto/user.create.dto'

import { RequestUserDto } from './dto/user.request.dto'


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
    async findAll(@Param('id') id:string): Promise<void> {
        console.log(`${id}`)
        // return this.usersService.findAll()
    }

    @Post('add')
    @ApiResponse({
        status:200, 
        description:"Create User", 
        type:CreateUserDto
    })
    @ApiBody({type:RequestUserDto})
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
}