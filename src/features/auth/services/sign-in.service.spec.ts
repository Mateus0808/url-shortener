import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import { UnauthorizedError } from '../../../common/errors/unauthorized-error/unauthorized-error';
import { NotFoundError } from '../../../common/errors/not-found-error/not-found-error';
import { IGetUserByParamServiceToken } from '../../user/interfaces/services/get-user-by-param.interface';
import { IHashComparerToken } from '../../user/interfaces/hasher/hasher.interface';
import { IJwtGenerateTokensToken } from '../interfaces/jwt/jwt.interface';

describe('SignInService', () => {
  let service: SignInService;

  const mockUser = {
    id: 'user-id',
    name: 'User Test',
    email: 'user@example.com',
    password: 'hashed-password',
  };

  const userService = {
    execute: jest.fn(),
  };

  const hasher = {
    compare: jest.fn(),
  };

  const jwtService = {
    generateTokens: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        { provide: IGetUserByParamServiceToken, useValue: userService },
        { provide: IHashComparerToken, useValue: hasher },
        { provide: IJwtGenerateTokensToken, useValue: jwtService },
      ],
    }).compile();

    service = module.get<SignInService>(SignInService);

    jest.clearAllMocks();
  });

  it('should sign in successfully with valid credentials', async () => {
    userService.execute.mockResolvedValue(mockUser);
    hasher.compare.mockResolvedValue(true);
    jwtService.generateTokens.mockResolvedValue({ token: 'jwt-token' });

    const result = await service.signIn({
      email: 'user@example.com',
      password: 'correct-password',
    });

    expect(userService.execute).toHaveBeenCalledWith(
      { email: 'user@example.com' },
      ['password'],
    );
    expect(hasher.compare).toHaveBeenCalledWith(
      'correct-password',
      'hashed-password',
    );
    expect(jwtService.generateTokens).toHaveBeenCalledWith({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(result).toEqual({ token: 'jwt-token' });
  });

  it('should throw UnauthorizedError if user is not found', async () => {
    userService.execute.mockRejectedValue(
      new NotFoundError('Usuário não encontrado'),
    );

    await expect(
      service.signIn({
        email: 'invalid@example.com',
        password: 'any-password',
      }),
    ).rejects.toThrow(NotFoundError);

    expect(userService.execute).toHaveBeenCalledWith(
      { email: 'invalid@example.com' },
      ['password'],
    );
  });

  it('should throw UnauthorizedError if password is incorrect', async () => {
    userService.execute.mockResolvedValue(mockUser);
    hasher.compare.mockResolvedValue(false);

    await expect(
      service.signIn({ email: 'user@example.com', password: 'wrong-password' }),
    ).rejects.toThrow(UnauthorizedError);

    expect(hasher.compare).toHaveBeenCalledWith(
      'wrong-password',
      'hashed-password',
    );
  });

  it('should call services with correct parameters', async () => {
    userService.execute.mockResolvedValue(mockUser);
    hasher.compare.mockResolvedValue(true);
    jwtService.generateTokens.mockResolvedValue({ token: 'jwt-token' });

    await service.signIn({
      email: 'user@example.com',
      password: 'correct-password',
    });

    expect(userService.execute).toHaveBeenCalledTimes(1);
    expect(hasher.compare).toHaveBeenCalledTimes(1);
    expect(jwtService.generateTokens).toHaveBeenCalledTimes(1);
  });
});
