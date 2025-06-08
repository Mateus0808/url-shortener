import { CreateShortUrlDto } from "../../dto/create-short-url.dto";
import { ShortUrlDatabase } from "../entities/short-url-db.entity";

export interface CreateShortUrlParams extends CreateShortUrlDto {}

export interface CreateShortUrlResponse extends Omit<ShortUrlDatabase, 'shortCode'> {
  shortenerUrl: string
}

export interface ICreateShortUrlService {
  execute: (shortUrlDto: CreateShortUrlParams, userId?: string) => Promise<CreateShortUrlResponse>
}

export const ICreateShortUrlServiceToken = 'ICreateShortUrlServiceToken'