import { Inject, Injectable } from "@nestjs/common";
import { IIncrementClickService } from "../interfaces/services/increment-clicks-service.interface";
import { IGetUrlByParamService, IGetUrlByParamServiceToken, ShortUrlResponse } from "../interfaces/services/get-url-by-param-service.interface";
import { IUpdateUrlRepository, IUpdateUrlRepositoryToken } from "../interfaces/repositories/update-url-repository.interface";
import { BadRequestError } from "../../../common/errors/bad-request-error/bad-request-error";
import { mapToShortUrlResponse } from "../mapper/short-url.mapper";

@Injectable()
export class IncrementClickService implements IIncrementClickService {
  constructor(
    @Inject(IGetUrlByParamServiceToken)
    private readonly getUrlService: IGetUrlByParamService,

    @Inject(IUpdateUrlRepositoryToken)
    private readonly updateUrlRepo: IUpdateUrlRepository
  ) {}

  async execute (shortCode: string): Promise<ShortUrlResponse> {
    const url = await this.getUrlService.execute({ shortCode })

    const updatedUrl = await this.updateUrlRepo.update(url.id, {
      clicks: url.clicks + 1
    })
    if (!updatedUrl) throw new BadRequestError('Erro ao atualizar quantidade de clicks')

    return mapToShortUrlResponse(updatedUrl)
  }
}