import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { User } from './enity/user.create.entity'
import { Cursor } from './enity/user.cursor.entity'

import { CreateUserDto } from './dto/user.create.dto'
import { GetUserDto } from './dto/user.get.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Cursor)
    private cursorRepository: Repository<Cursor>,
  ) {}

  async findAll(query: Record<string, any>){
    let sortResult
    const cursor = await this.cursorRepository.findOne({id:query.id})
    if(!cursor) {
      const newCursor = 
      {
        id: query.id, 
        page: 1, 
        perPage: query.perPage,
        cursor: this.createCursor(41)
      }  
      this.cursorRepository.save(newCursor)
      const resultQuery = await this.usersRepository.find({to:query.id})
      sortResult = resultQuery.reverse().slice(0, query.perPage)
    }

    else {

      const resultQuery = await this.usersRepository.find({to:cursor.id})
      sortResult = resultQuery.reverse().slice(
        Number(cursor.perPage)*Number(cursor.page), 
        Number(cursor.perPage)*Number(cursor.page)+Number(cursor.perPage))
    }


    const responseArr = 
    {
      total:sortResult.length, 
      nextCursor: this.createCursor(41), 
      items:sortResult
    }
 

    return responseArr
  }

  async create(createUserDto: CreateUserDto) {

    const resultOrden = await this.usersRepository.findOne({to:createUserDto.to}, {order: {id: 'DESC'}, select:['id']})

    if(!resultOrden) {createUserDto.id = createUserDto.to + '#000001'}
    else {
      createUserDto.id = createUserDto.to + '#' + String(Number(resultOrden.id.replace(/\S+#0*/, ''))+1).padStart(6,"0")
    }
    return this.usersRepository.save(createUserDto)
  }

  private createCursor(length): String {
    let result           = '';
    const characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result; //8htovc26sg2gzgs623mkrhozg5q4wkhszrehrqbc3
 }

}