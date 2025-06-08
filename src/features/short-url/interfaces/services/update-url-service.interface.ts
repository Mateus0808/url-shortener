import { ShortUrlDatabase } from '../entities/short-url-db.entity';

export interface UpdateUrlParams {
  id: string;
  data: Partial<Pick<ShortUrlDatabase, 'originalUrl'>>;
}

export interface UpdateShortUrlResponse extends ShortUrlDatabase {}

export interface IUpdateUrlService {
  execute: (
    params: UpdateUrlParams,
    userId: string,
  ) => Promise<UpdateShortUrlResponse>;
}

export const IUpdateUrlServiceToken = 'IUpdateUrlServiceToken';
