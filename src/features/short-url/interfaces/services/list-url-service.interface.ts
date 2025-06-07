import { ShortUrlResponse } from './get-url-by-param-service.interface';

export interface IListUrlsByUserService {
  execute: (userId: string) => Promise<ShortUrlResponse[]>
}

export const IListUrlsByUserServiceToken = 'IListUrlsByUserServiceToken';
