import { UserDatabaseModel } from "../entities/user-db.entity"

export interface UserResponse extends Partial<UserDatabaseModel> {}

export interface IGetUserByParamService {
  execute(
    query: Partial<UserDatabaseModel>,
    select: ['password', ...any[]]
  ): Promise<Required<UserDatabaseModel>>;

  execute(
    query: Partial<UserDatabaseModel>,
    select?: (keyof UserDatabaseModel)[]
  ): Promise<Partial<UserDatabaseModel>>;
}

export const IGetUserByParamServiceToken = 'IGetUserByParamServiceToken'