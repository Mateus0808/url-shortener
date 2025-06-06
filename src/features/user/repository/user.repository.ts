import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserRepositoryParams, ICreateUserRepository } from "../interfaces/repositories/create-user-repository.interface";
import { User } from "../user.entity";
import { UserDatabaseModel } from "../interfaces/entities/user-db.entity";
import { IFindOneUserRepository } from "../interfaces/repositories/load-user-by-param-repository.interface";


@Injectable()
export class UserRepository implements ICreateUserRepository, IFindOneUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  

  async createUser (data: CreateUserRepositoryParams): Promise<UserDatabaseModel | null> {
    const user = this.userRepository.create(data)

    const savedUser = await this.userRepository.save(user)
    if (!savedUser) return null

    return savedUser
  }

  async findOne (param: Partial<UserDatabaseModel>): Promise<UserDatabaseModel | null> {
    const user = await this.userRepository.findOne({ where: param })
    if(!user) return null

    return user
  }
}
