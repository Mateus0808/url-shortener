import { UserDatabaseModel } from "../interfaces/entities/user-db.entity";

export const mapToUserResponse = (user: UserDatabaseModel): Partial<UserDatabaseModel> => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})