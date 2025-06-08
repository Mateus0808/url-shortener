import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserParams,
  CreateUserReponse,
  ICreateUserService,
} from '../interfaces/services/create-user-service.interface';
import {
  ICreateUserRepository,
  ICreateUserRepositoryToken,
} from '../interfaces/repositories/create-user-repository.interface';
import {
  IFindOneUserRepository,
  IFindOneUserRepositoryToken,
} from '../interfaces/repositories/load-user-by-param-repository.interface';
import { AlreadyExistsError } from '../../../common/errors/already-exists-error/already-exists-error';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';
import { IHasher, IHasherToken } from '../interfaces/hasher/hasher.interface';
import { mapToUserResponse } from '../mappers/user.mapper';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(ICreateUserRepositoryToken)
    private readonly userRepository: ICreateUserRepository,

    @Inject(IFindOneUserRepositoryToken)
    private readonly loadUserByParamRepository: IFindOneUserRepository,

    @Inject(IHasherToken)
    private readonly argon: IHasher,
  ) {}

  async createUser(params: CreateUserParams): Promise<CreateUserReponse> {
    const { email, name, password } = params;

    const userEmailAlreadyExists = await this.loadUserByParamRepository.findOne(
      { email },
    );
    if (userEmailAlreadyExists)
      throw new AlreadyExistsError('O email já existe');

    const hashedPassword = await this.argon.hash(password);

    const createdUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    if (!createdUser) throw new BadRequestError('Erro ao criar usuário');

    return mapToUserResponse(createdUser);
  }
}
