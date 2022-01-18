import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.create.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { GetUserDto } from './dto/user.get.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private cursor = [];

  async listUser(query: Record<string, any>): Promise<GetUserDto> {
    let sortResult = [];
    const thankListUser = await this.usersRepository.find({ to: query.id });

    const checkCursorFunction = obj => obj.NextCursor === query.cursor;
    const checkCursor = this.cursor.some(checkCursorFunction)

    
    let newNextCursor = this.createCursor(41);
    if (!query.cursor && thankListUser && query.perPage) {

      sortResult = thankListUser.reverse().slice(0, query.perPage);
      if (query.perPage == thankListUser.length) newNextCursor = null;

      const newCursor = {
        id: query.id,
        onAllPages: Number(query.perPage),
        perPage: Number(query.perPage),
        NextCursor: newNextCursor,
      };
      this.cursor.push(newCursor)

    } else if (checkCursor) {
      const userCursor = this.cursor.find(objCursor =>  objCursor.NextCursor===query.cursor);
      const onAllPages = userCursor.onAllPages + userCursor.perPage

      sortResult = thankListUser.reverse().slice(userCursor.onAllPages, onAllPages);

      if (onAllPages === thankListUser.length) newNextCursor = null;
      if (sortResult.length != 0) {
        userCursor.NextCursor = newNextCursor;
        userCursor.onAllPages = onAllPages;
      }
    } else newNextCursor = null

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
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
