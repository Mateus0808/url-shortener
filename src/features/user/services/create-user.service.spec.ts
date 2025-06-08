import { CreateUserService } from './create-user.service';
import { AlreadyExistsError } from '../../../common/errors/already-exists-error/already-exists-error';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';
import {
  ICreateUserRepository,
  ICreateUserRepositoryToken,
} from '../interfaces/repositories/create-user-repository.interface';
import {
  IFindOneUserRepository,
  IFindOneUserRepositoryToken,
} from '../interfaces/repositories/load-user-by-param-repository.interface';
import { IHasher, IHasherToken } from '../interfaces/hasher/hasher.interface';
import { CreateUserParams } from '../interfaces/services/create-user-service.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: jest.Mocked<ICreateUserRepository>;
  let findOneUserRepository: jest.Mocked<IFindOneUserRepository>;
  let hasher: jest.Mocked<IHasher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: ICreateUserRepositoryToken,
          useValue: { createUser: jest.fn() },
        },
        {
          provide: IFindOneUserRepositoryToken,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: IHasherToken,
          useValue: { hash: jest.fn() },
        },
      ],
    }).compile();

    service = module.get(CreateUserService);
    userRepository = module.get(ICreateUserRepositoryToken);
    findOneUserRepository = module.get(IFindOneUserRepositoryToken);
    hasher = module.get(IHasherToken);
  });

  const createUserDto: CreateUserParams = {
    name: 'User Test',
    email: 'user@example.com',
    password: '123456',
  };

  const createdUserMock = {
    id: 'user-id-1',
    name: 'User Test',
    email: 'user@example.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a user successfully', async () => {
    findOneUserRepository.findOne.mockResolvedValue(null);
    hasher.hash.mockResolvedValue('hashedPassword');
    userRepository.createUser.mockResolvedValue(createdUserMock);

    const result = await service.createUser(createUserDto);

    expect(findOneUserRepository.findOne).toHaveBeenCalledWith({
      email: createUserDto.email,
    });
    expect(hasher.hash).toHaveBeenCalledWith(createUserDto.password);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: createUserDto.name,
      email: createUserDto.email,
      password: 'hashedPassword',
    });

    expect(result).toEqual({
      id: createdUserMock.id,
      name: createdUserMock.name,
      email: createdUserMock.email,
      createdAt: createdUserMock.createdAt,
      updatedAt: createdUserMock.updatedAt,
    });
  });

  it('should throw AlreadyExistsError if the email already exists', async () => {
    findOneUserRepository.findOne.mockResolvedValue(createdUserMock);

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      AlreadyExistsError,
    );
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError if repository returns null', async () => {
    findOneUserRepository.findOne.mockResolvedValue(null);
    hasher.hash.mockResolvedValue('hashedPassword');
    userRepository.createUser.mockResolvedValue(null);

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      BadRequestError,
    );
  });
});
