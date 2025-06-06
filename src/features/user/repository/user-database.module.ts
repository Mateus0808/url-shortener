import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { ICreateUserRepositoryToken } from '../interfaces/repositories/create-user-repository.interface';
import { UserRepository } from './user.repository';
import { IFindOneUserRepositoryToken } from '../interfaces/repositories/load-user-by-param-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    {
      provide: ICreateUserRepositoryToken,
      useClass: UserRepository
    },
    {
      provide: IFindOneUserRepositoryToken,
      useClass: UserRepository
    }
  ],
  exports: [
    ICreateUserRepositoryToken, 
    IFindOneUserRepositoryToken 
  ]
})
export class UserDatabaseModule {}