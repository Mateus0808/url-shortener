import { Inject, Injectable } from "@nestjs/common";
import { IDeleteUrlService } from "../interfaces/services/delete-url-service.interface";
import { IDeleteUrlRepository, IDeleteUrlRepositoryToken } from "../interfaces/repositories/delete-url-repository.interface";
import { IGetUrlByParamService, IGetUrlByParamServiceToken } from "../interfaces/services/get-url-by-param-service.interface";
import { NotFoundError } from "../../../common/errors/not-found-error/not-found-error";
import { UnauthorizedError } from "../../../common/errors/unauthorized-error/unauthorized-error";

@Injectable()
export class DeleteUrlService implements IDeleteUrlService {
  constructor(
    @Inject(IGetUrlByParamServiceToken)
    private readonly getUrlService: IGetUrlByParamService,

    @Inject(IDeleteUrlRepositoryToken)
    private readonly urlRepo: IDeleteUrlRepository
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const url = await this.getUrlService.execute({ id });

    if (!url) throw new NotFoundError('URL não encontrada');
    
    if (url.userId !== userId) {
      throw new UnauthorizedError('Você não tem permissão para excluir esta URL');
    }

    await this.urlRepo.delete(id);
  }
}