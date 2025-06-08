import { ShortUrlResponse } from './get-url-by-param-service.interface';

export interface IIncrementClickService {
  execute: (shortCode: string) => Promise<ShortUrlResponse>;
}

export const IIncrementClickServiceToken = 'IIncrementClickServiceToken';
