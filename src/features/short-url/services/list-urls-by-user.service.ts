import { Inject, Injectable } from "@nestjs/common";
import { IListUrlsByUserService } from "../interfaces/services/list-url-service.interface";
import { ShortUrlResponse } from "../interfaces/services/get-url-by-param-service.interface";
import { IListUrlsRepository, IListUrlsRepositoryToken } from "../interfaces/repositories/list-url-repository.interface";
import { mapToShortUrlResponse } from "../mapper/short-url.mapper";

@Injectable()
export class ListUrlsByUserService implements IListUrlsByUserService {
  constructor(
    @Inject(IListUrlsRepositoryToken)
    private readonly urlService: IListUrlsRepository
  ) {}

  async execute (userId: string): Promise<ShortUrlResponse[]> {
    const urls = await this.urlService.findAllByUser(userId)

    return urls.map(url => mapToShortUrlResponse(url))
  }
}