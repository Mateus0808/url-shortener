export interface ShortUrlDatabase {
  id: string
  userId?: string
  shortCode: string
  originalUrl: string
  clicks: number;
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}