import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from '../short-url.entity';
import { ICreateShortUrlRepositoryToken } from '../interfaces/repositories/create-short-url-repository.interface';
import { ShortUrlRepository } from './short-url.repository';
import { ILoadUrlByParamRepositoryToken } from '../interfaces/repositories/load-url-repository.interface';
import { IListUrlsRepositoryToken } from '../interfaces/repositories/list-url-repository.interface';
import { IUpdateUrlRepositoryToken } from '../interfaces/repositories/update-url-repository.interface';
import { IDeleteUrlRepositoryToken } from '../interfaces/repositories/delete-url-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl])],
  providers: [
    {
      provide: ICreateShortUrlRepositoryToken,
      useClass: ShortUrlRepository,
    },
    {
      provide: ILoadUrlByParamRepositoryToken,
      useClass: ShortUrlRepository,
    },
    {
      provide: IListUrlsRepositoryToken,
      useClass: ShortUrlRepository,
    },
    {
      provide: IUpdateUrlRepositoryToken,
      useClass: ShortUrlRepository,
    },
    {
      provide: IDeleteUrlRepositoryToken,
      useClass: ShortUrlRepository,
    },
  ],
  exports: [
    ICreateShortUrlRepositoryToken,
    ILoadUrlByParamRepositoryToken,
    IListUrlsRepositoryToken,
    IUpdateUrlRepositoryToken,
    IDeleteUrlRepositoryToken,
  ],
})
export class ShortUrlDatabaseModule {}
