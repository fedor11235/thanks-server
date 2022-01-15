import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Userinterface } from './user.interface';
import { CreateUserDto } from './user.dto';

@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('list')
    async findAll(): Promise<Userinterface[]> {
        return this.usersService.findAll();
    }

    @Post('add')
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }
}