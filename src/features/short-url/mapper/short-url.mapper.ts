import { ShortUrlDatabase } from "../interfaces/entities/short-url-db.entity";
import { ShortUrlResponse } from "../interfaces/services/get-url-by-param-service.interface";

export const mapToShortUrlResponse = (data: ShortUrlDatabase): ShortUrlResponse => ({
  id: data.id,
  userId: data.userId,
  shortenerUrl: `http://localhost/${data.shortCode}`,
  originalUrl: data.originalUrl,
  clicks: data.clicks,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt
})