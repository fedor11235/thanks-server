import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './enity/user.create.entity'
import { Cursor } from './enity/user.cursor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Cursor])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}