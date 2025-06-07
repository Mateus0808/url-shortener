import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateShortUrlRepositoryParams, ICreateShortUrlRepository } from "../interfaces/repositories/create-short-url-repository.interface";
import { ShortUrl } from "../short-url.entity";
import { ShortUrlDatabase } from "../interfaces/entities/short-url-db.entity";
import { ILoadUrlByParamRepository, LoadUrlByParamsRepository } from "../interfaces/repositories/load-url-repository.interface";
import { IListUrlsRepository } from "../interfaces/repositories/list-url-repository.interface";
import { IUpdateUrlRepository } from "../interfaces/repositories/update-url-repository.interface";
import { IDeleteUrlRepository } from "../interfaces/repositories/delete-url-repository.interface";

@Injectable()
export class ShortUrlRepository implements 
  ICreateShortUrlRepository, 
  ILoadUrlByParamRepository,
  IListUrlsRepository,
  IUpdateUrlRepository,
  IDeleteUrlRepository
   {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly urlRepository: Repository<ShortUrl>
  ) {}
  findAll: (userId: string) => Promise<ShortUrlDatabase[]>;
  
  async create (data: CreateShortUrlRepositoryParams): Promise<ShortUrlDatabase | null> {
    const url = this.urlRepository.create(data)

    const savedUrl = await this.urlRepository.save(url)
    if(!savedUrl) return null

    return savedUrl
  }

  async findOne (param: LoadUrlByParamsRepository): Promise<ShortUrlDatabase | null> {
    const url = await this.urlRepository.findOne({ where: param })
    if(!url) return null

    return url
  }

  async findAllByUser (userId: string): Promise<ShortUrlDatabase[]> {
    return await this.urlRepository.find({ where: { user: { id: userId } } });
  }

  async update (id: string, data: Partial<ShortUrlDatabase>): Promise<ShortUrlDatabase | null>{
    const url = await this.urlRepository.update(id, data);
    if (url.affected === 0) return null

    return await this.findOne({ id })
  }

  async delete (id: string): Promise<boolean> {
    const result = await this.urlRepository.softDelete(id);

    return result.affected !== 0;
  }
}