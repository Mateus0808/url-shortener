import { ShortUrlDatabase } from "../entities/short-url-db.entity";
import { GetUrlByParams } from "../services/get-url-by-param-service.interface";

export interface LoadUrlByParamsRepository extends Partial<GetUrlByParams> {}

export interface ILoadUrlByParamRepository {
  findOne: (param: LoadUrlByParamsRepository) => Promise<ShortUrlDatabase | null>
}

export const ILoadUrlByParamRepositoryToken = 'ILoadUrlByParamRepositoryToken'