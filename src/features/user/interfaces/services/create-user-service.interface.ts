import { CreateUserDto } from '../../dto/create-user.dto';
import { UserDatabaseModel } from '../entities/user-db.entity';

export interface CreateUserParams extends CreateUserDto {}

export interface CreateUserReponse extends Partial<UserDatabaseModel> {}

export interface ICreateUserService {
  createUser: (params: CreateUserParams) => Promise<CreateUserReponse>;
}

export const ICreateUserServiceToken = 'ICreateUserServiceToken';
