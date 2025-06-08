import { Inject, Injectable } from "@nestjs/common";
import { IFindOneUserRepository, IFindOneUserRepositoryToken } from "../interfaces/repositories/load-user-by-param-repository.interface";
import { IGetUserByParamService } from "../interfaces/services/get-user-by-param.interface";
import { UserDatabaseModel } from "../interfaces/entities/user-db.entity";
import { NotFoundError } from "../../../common/errors/not-found-error/not-found-error";
import { mapToUserResponse } from "../mappers/user.mapper";

@Injectable()
export class GetUserService implements IGetUserByParamService {
  constructor(
    @Inject(IFindOneUserRepositoryToken)
    private readonly loadUserRepository: IFindOneUserRepository,
  ) {}

  execute(
    query: Partial<UserDatabaseModel>, select: ["password", ...any[]]
  ): Promise<Required<UserDatabaseModel>>;
  
  execute(
    query: Partial<UserDatabaseModel>, select?: (keyof UserDatabaseModel)[]
  ): Promise<Partial<UserDatabaseModel>>;

   async execute(
    query: Partial<UserDatabaseModel>,
    select?: (keyof UserDatabaseModel)[]
  ): Promise<Partial<UserDatabaseModel>> {
    const user = await this.loadUserRepository.findOne(query);

    if (!user) throw new NotFoundError('Usuário não encontrado');

    if (select?.includes('password')) {
      return user as Required<Pick<UserDatabaseModel, 'password'>> & Partial<UserDatabaseModel>;
    }

    return mapToUserResponse(user);
  }
}