import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './enity/user.create.entity';
import { Cursor } from './enity/user.cursor.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { GetUserDto } from './dto/user.get.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Cursor)
    private cursorRepository: Repository<Cursor>,
  ) {}

  async listUser(query: Record<string, any>): Promise<GetUserDto> {
    let sortResult;
    const checkUsers = await this.usersRepository.findOne({ to: query.id });
    const checkCursor = await this.cursorRepository.findOne({
      cursor: query.cursor,
    });

    let newNextCursor = this.createCursor(41);
    if (!query.cursor && checkUsers) {
      const newCursor = {
        id: query.id,
        page: 1,
        perPage: query.perPage,
        cursor: newNextCursor,
      };
      this.cursorRepository.save(newCursor);
      const resultQuery = await this.usersRepository.find({ to: query.id });
      sortResult = resultQuery.reverse().slice(0, query.perPage);
      if(sortResult[sortResult.length-1].id===resultQuery[resultQuery.length-1].id) newNextCursor = null;
      
    } else if (checkCursor) {
      const cursor = await this.cursorRepository.findOne({
        cursor: query.cursor,
      });
      const resultQuery = await this.usersRepository.find({ to: cursor.id });

      sortResult = resultQuery
        .reverse()
        .slice(
          Number(cursor.perPage) * Number(cursor.page),
          Number(cursor.perPage) * Number(cursor.page) + Number(cursor.perPage),
        );
      if(sortResult[sortResult.length-1].id===resultQuery[resultQuery.length-1].id) newNextCursor = null;
      console.log(sortResult[sortResult.length-1].id, resultQuery[sortResult.length-1].id)

      if (sortResult.length != 0) {
        cursor.cursor = newNextCursor;
        cursor.page = Number(cursor.page) + 1;
      } 

      this.cursorRepository.save(cursor);
    } 

    const responseArr = {
      total: sortResult.length,
      nextCursor: newNextCursor,
      items: sortResult,
    };

    return responseArr;
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const resultOrden = await this.usersRepository.findOne(
      { to: createUserDto.to },
      { order: { id: 'DESC' }, select: ['id'] },
    );

    if (!resultOrden) {
      createUserDto.id = createUserDto.to + '#000001';
    } else {
      createUserDto.id =
        createUserDto.to +
        '#' +
        String(Number(resultOrden.id.replace(/\S+#0*/, '')) + 1).padStart(
          6,
          '0',
        );
    }
    return this.usersRepository.save(createUserDto);
  }

  private createCursor(length: number): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
