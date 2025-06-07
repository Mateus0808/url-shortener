import { Inject, Injectable } from "@nestjs/common";
import { GetUrlByParams, IGetUrlByParamService, ShortUrlResponse } from "../interfaces/services/get-url-by-param-service.interface";
import { ILoadUrlByParamRepository, ILoadUrlByParamRepositoryToken } from "../interfaces/repositories/load-url-repository.interface";
import { NotFoundError } from "src/common/errors/not-found-error/not-found-error";
import { mapToShortUrlResponse } from "../mapper/short-url.mapper";

@Injectable()
export class GetShortUrlByParamService implements IGetUrlByParamService {
  constructor(
    @Inject(ILoadUrlByParamRepositoryToken)
    private readonly urlRepository: ILoadUrlByParamRepository
  ) {}

  async execute (query: Partial<GetUrlByParams>): Promise<ShortUrlResponse> {
    const url = await this.urlRepository.findOne(query)

    if(!url) throw new NotFoundError('URL não encontrada')
    
    return mapToShortUrlResponse(url)
  }
}