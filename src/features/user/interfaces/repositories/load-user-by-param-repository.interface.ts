import { UserDatabaseModel } from '../entities/user-db.entity';

export interface IFindOneUserRepository {
  findOne: (
    param: Partial<UserDatabaseModel>,
  ) => Promise<UserDatabaseModel | null>;
}

export const IFindOneUserRepositoryToken = 'IFindOneUserRepositoryToken';
