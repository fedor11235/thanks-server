import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
})
export class AppModule {}
