import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.create.dto';
import { RequestUserDto } from './dto/user.request.dto';
import { GetUserDto } from './dto/user.get.dto';

@ApiTags('User Api')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiResponse({
    status: 200,
    description: 'All users on this page',
    type: GetUserDto,
  })
  @ApiQuery({ name: 'id', required: false, description: 'recipient user id' })
  @ApiQuery({
    name: 'perPage',
    required: false,
    description: 'number of entries',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'cursor to the next page',
  })
  async listUser(@Query() query: Record<string, any>): Promise<any> {
    return this.usersService.listUser(query);
  }

  @Post('add')
  @ApiResponse({
    status: 200,
    description: 'Create User',
    type: CreateUserDto,
  })
  @ApiBody({ type: RequestUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }
}
