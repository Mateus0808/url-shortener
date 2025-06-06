import { UserDatabaseModel } from "../entities/user-db.entity"
import { CreateUserParams } from "../services/create-user-service.interface"

export interface CreateUserRepositoryParams extends CreateUserParams {}

export interface ICreateUserRepository {
  createUser: (data: CreateUserRepositoryParams) => Promise<UserDatabaseModel | null>
}

export const ICreateUserRepositoryToken = 'ICreateUserRepositoryToken'