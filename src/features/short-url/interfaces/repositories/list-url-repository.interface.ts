import { ShortUrlDatabase } from '../entities/short-url-db.entity';

export interface IListUrlsRepository {
  findAllByUser: (userId: string) => Promise<ShortUrlDatabase[]>;
}

export const IListUrlsRepositoryToken = 'IListUrlsRepositoryToken';
