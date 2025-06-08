import { Inject, Injectable } from "@nestjs/common";
import { ICreateShortUrlRepository, ICreateShortUrlRepositoryToken } from "../interfaces/repositories/create-short-url-repository.interface";
import { CreateShortUrlParams, CreateShortUrlResponse, ICreateShortUrlService } from "../interfaces/services/create-short-url-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "../../../features/user/interfaces/services/get-user-by-param.interface";
import { UserDatabaseModel } from "../../../features/user/interfaces/entities/user-db.entity";
import { BadRequestError } from "../../../common/errors/bad-request-error/bad-request-error";
import { ILoadUrlByParamRepository, ILoadUrlByParamRepositoryToken } from "../interfaces/repositories/load-url-repository.interface";
import { mapToShortUrlResponse } from "../mapper/short-url.mapper";
import { ShortUrlDatabase } from "../interfaces/entities/short-url-db.entity";
import { CustomMetricsService } from "../../../features/metrics/metrics.service";

@Injectable()
export class CreateShortUrlService implements ICreateShortUrlService {
  constructor(
    @Inject(ICreateShortUrlRepositoryToken)
    private readonly createUrlRepository: ICreateShortUrlRepository,

    @Inject(ILoadUrlByParamRepositoryToken)
    private readonly shortUrlRepo: ILoadUrlByParamRepository,

    @Inject(IGetUserByParamServiceToken)
    private readonly userService: IGetUserByParamService,

    private readonly metricsService: CustomMetricsService
  ) {}

  async execute(
    shortUrlDto: CreateShortUrlParams, userId?: string
  ): Promise<CreateShortUrlResponse> {
    const end = this.metricsService.startTimerForShortenRequest();

    let code: string;
    let exists: ShortUrlDatabase | null;
    let userExists: UserDatabaseModel | undefined

    do {
      code = this.generateCode();
      exists = await this.shortUrlRepo.findOne({ shortCode: code });
    } while (exists);

    if (userId) {
      userExists = await this.userService.execute({ id: userId }, ['password'])
    }

    const shortUrl = await this.createUrlRepository.create({
      originalUrl: shortUrlDto.originalUrl,
      shortCode: code,
      user: userExists
    });
    if (!shortUrl) {
      end()
      throw new BadRequestError('Erro ao criar url')
    }

    this.metricsService.incrementUrlShortened();
    end();
    return mapToShortUrlResponse(shortUrl)
  }

  private generateCode(length = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}