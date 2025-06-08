import { ShortUrlDatabase } from '../entities/short-url-db.entity';

export interface GetUrlByParams {
  id: string;
  shortCode: string;
}

export interface ShortUrlResponse extends Omit<ShortUrlDatabase, 'shortCode'> {
  shortenerUrl: string;
}

export interface IGetUrlByParamService {
  execute: (query: Partial<GetUrlByParams>) => Promise<ShortUrlResponse>;
}

export const IGetUrlByParamServiceToken = 'IGetUrlByParamServiceToken';
