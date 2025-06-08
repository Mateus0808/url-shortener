import { ShortUrlDatabase } from '../entities/short-url-db.entity';

export interface IUpdateUrlRepository {
  update: (
    id: string,
    data: Partial<ShortUrlDatabase>,
  ) => Promise<ShortUrlDatabase | null>;
}

export const IUpdateUrlRepositoryToken = 'IUpdateUrlRepositoryToken';
