export interface UserDatabaseModel {
  id: string
  name: string
  email: string
  password: string
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}