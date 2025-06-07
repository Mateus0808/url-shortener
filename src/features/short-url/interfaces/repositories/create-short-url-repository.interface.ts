import { UserDatabaseModel } from "src/features/user/interfaces/entities/user-db.entity"
import { ShortUrlDatabase } from "../entities/short-url-db.entity"
import { CreateShortUrlParams } from "../services/create-short-url-service.interface"

export interface CreateShortUrlRepositoryParams extends CreateShortUrlParams {
  shortCode: string
  user?: UserDatabaseModel
}

export interface ICreateShortUrlRepository {
  create: (data: CreateShortUrlRepositoryParams) => Promise<ShortUrlDatabase | null>
}

export const ICreateShortUrlRepositoryToken = 'ICreateShortUrlRepositoryToken'