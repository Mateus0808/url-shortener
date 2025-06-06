export type ShortUrl = {
  id: string
  userId: string | null
  shortCode: string
  originalUrl: string
  clicks: number;
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
