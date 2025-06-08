import { Inject, Injectable } from '@nestjs/common';
import {
  IUpdateUrlService,
  UpdateShortUrlResponse,
  UpdateUrlParams,
} from '../interfaces/services/update-url-service.interface';
import {
  IGetUrlByParamService,
  IGetUrlByParamServiceToken,
} from '../interfaces/services/get-url-by-param-service.interface';
import {
  IUpdateUrlRepository,
  IUpdateUrlRepositoryToken,
} from '../interfaces/repositories/update-url-repository.interface';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';
import { UnauthorizedError } from '../../../common/errors/unauthorized-error/unauthorized-error';

@Injectable()
export class UpdateUrlService implements IUpdateUrlService {
  constructor(
    @Inject(IGetUrlByParamServiceToken)
    private readonly getUrlService: IGetUrlByParamService,

    @Inject(IUpdateUrlRepositoryToken)
    private readonly updateUrlRepo: IUpdateUrlRepository,
  ) {}

  async execute(
    params: UpdateUrlParams,
    userId: string,
  ): Promise<UpdateShortUrlResponse> {
    const { data, id } = params;
    const url = await this.getUrlService.execute({ id });

    if (url.userId !== userId) {
      throw new UnauthorizedError(
        'Você não tem permissão para atualizar esta URL',
      );
    }

    const updatedUrl = await this.updateUrlRepo.update(id, data);
    if (!updatedUrl)
      throw new BadRequestError('Erro ao atualizar url de origem');

    return updatedUrl;
  }
}
