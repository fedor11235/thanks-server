import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

import { CreateUserDto } from './user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async create(createUserDto: CreateUserDto) {

    const resultOrden = await this.usersRepository.findOne({order: {id: 'DESC'}, select:['id']})

    if(!resultOrden) {createUserDto.id = createUserDto.to + '#000001'}
    else {
      createUserDto.id = createUserDto.to + '#' + String(Number(resultOrden.id.replace(/\S+#0*/, ''))+1).padStart(6,"0")
    }
    this.usersRepository.save(createUserDto)
  }

}