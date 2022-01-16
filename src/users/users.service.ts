import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

import { CreateUserDto } from './dto/user.create.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: Record<string, any>): Promise<User[]> {
    console.log(query)
    return this.usersRepository.find({to:query.id})
  }

  async create(createUserDto: CreateUserDto) {

    const resultOrden = await this.usersRepository.findOne({to:createUserDto.to}, {order: {id: 'DESC'}, select:['id']})

    if(!resultOrden) {createUserDto.id = createUserDto.to + '#000001'}
    else {
      createUserDto.id = createUserDto.to + '#' + String(Number(resultOrden.id.replace(/\S+#0*/, ''))+1).padStart(6,"0")
    }
    return this.usersRepository.save(createUserDto)
  }

}