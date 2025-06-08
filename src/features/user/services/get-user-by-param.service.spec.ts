import { GetUserService } from './get-user-by-param.service';
import { IFindOneUserRepository } from '../interfaces/repositories/load-user-by-param-repository.interface';
import { UserDatabaseModel } from '../interfaces/entities/user-db.entity';
import { NotFoundError } from '../../../common/errors/not-found-error/not-found-error';

describe('GetUserService', () => {
  let service: GetUserService;
  let loadUserRepository: jest.Mocked<IFindOneUserRepository>;

  beforeEach(() => {
    loadUserRepository = {
      findOne: jest.fn(),
    };

    service = new GetUserService(loadUserRepository);
  });

  const userMock: UserDatabaseModel = {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should return the user normally if found', async () => {
    const { password, ...userWithoutPassword } = userMock;
    loadUserRepository.findOne.mockResolvedValue(userMock);

    const result = await service.execute({ email: 'alice@example.com' });

    expect(loadUserRepository.findOne).toHaveBeenCalledWith({ email: 'alice@example.com' });
    expect(result).toEqual(userWithoutPassword);
  });

  it('should throw NotFoundError if user not found', async () => {
    loadUserRepository.findOne.mockResolvedValue(null);

    await expect(
      service.execute({ email: 'alice@example.com' })
    ).rejects.toThrow(NotFoundError);

    expect(loadUserRepository.findOne).toHaveBeenCalledWith({ email: 'alice@example.com' });
  });

  it('must return the user with password if requested', async () => {
    loadUserRepository.findOne.mockResolvedValue(userMock);

    const result = await service.execute({ email: 'alice@example.com' }, ['password']);

    expect(result).toEqual(userMock);
    expect(result.password).toBeDefined();
  });
});
