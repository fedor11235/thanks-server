import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { Userinterface } from './user.interface'

import { CreateUserDto } from './dto/user.create.dto'
import { GetUserDto } from './dto/user.get.dto'
import { RequestUserDto } from './dto/user.request.dto'


import { ApiBody, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger'

@ApiTags('User Api')
@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('list')
    @ApiResponse({
        status:200, 
        description:"All users on this page", 
        type:CreateUserDto
    })
    @ApiQuery({name: 'id', required: false, description: 'recipient user id'})
    @ApiQuery({name: 'perPage', required: false, description: 'number of entries'})
    @ApiQuery({name: 'cursor', required: false, description: 'cursor to the next page'})
    async findAll(@Query() query: Record<string, any>){
        return this.usersService.findAll(query)
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