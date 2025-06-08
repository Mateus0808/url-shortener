import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortUrlService } from './create-short-url.service';
import { CustomMetricsService } from '../../../features/metrics/metrics.service';
import {
  ICreateShortUrlRepository,
  ICreateShortUrlRepositoryToken,
} from '../interfaces/repositories/create-short-url-repository.interface';
import {
  ILoadUrlByParamRepository,
  ILoadUrlByParamRepositoryToken,
} from '../interfaces/repositories/load-url-repository.interface';
import {
  IGetUserByParamService,
  IGetUserByParamServiceToken,
} from '../../../features/user/interfaces/services/get-user-by-param.interface';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';
import { UserDatabaseModel } from 'src/features/user/interfaces/entities/user-db.entity';
import { ShortUrlDatabase } from '../interfaces/entities/short-url-db.entity';

describe('CreateShortUrlService', () => {
  let service: CreateShortUrlService;
  let createUrlRepo: jest.Mocked<ICreateShortUrlRepository>;
  let loadUrlRepo: jest.Mocked<ILoadUrlByParamRepository>;
  let userService: jest.Mocked<IGetUserByParamService>;
  let metricsService: jest.Mocked<CustomMetricsService>;

  const userMock: UserDatabaseModel = {
    id: 'user-id',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'hashed-pass',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const shortUrlMock: ShortUrlDatabase = {
    id: '1',
    originalUrl: 'https://example.com',
    shortCode: 'abc123',
    clicks: 0,
    userId: 'user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateShortUrlService,
        {
          provide: ICreateShortUrlRepositoryToken,
          useValue: { create: jest.fn() },
        },
        {
          provide: ILoadUrlByParamRepositoryToken,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: IGetUserByParamServiceToken,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CustomMetricsService,
          useValue: {
            startTimerForShortenRequest: jest.fn(),
            incrementUrlShortened: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CreateShortUrlService);
    createUrlRepo = module.get(ICreateShortUrlRepositoryToken);
    loadUrlRepo = module.get(ILoadUrlByParamRepositoryToken);
    userService = module.get(IGetUserByParamServiceToken);
    metricsService = module.get(CustomMetricsService);
  });

  it('should create a short URL successfully (with user)', async () => {
    const stopFn = jest.fn();
    metricsService.startTimerForShortenRequest.mockReturnValue(stopFn);
    loadUrlRepo.findOne.mockResolvedValueOnce(null); // codigo não existe
    userService.execute.mockResolvedValueOnce(userMock);
    createUrlRepo.create.mockResolvedValueOnce(shortUrlMock);

    const result = await service.execute(
      { originalUrl: 'https://example.com' },
      'user-id',
    );

    expect(loadUrlRepo.findOne).toHaveBeenCalledWith({
      shortCode: expect.any(String),
    });
    expect(userService.execute).toHaveBeenCalledWith({ id: 'user-id' }, [
      'password',
    ]);
    expect(createUrlRepo.create).toHaveBeenCalledWith({
      originalUrl: 'https://example.com',
      shortCode: expect.any(String),
      user: userMock,
    });
    expect(metricsService.incrementUrlShortened).toHaveBeenCalled();
    expect(stopFn).toHaveBeenCalled();
    expect(result).toEqual({
      id: '1',
      userId: 'user-id',
      originalUrl: 'https://example.com',
      shortenerUrl: 'http://localhost/abc123',
      clicks: 0,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should create a short URL successfully (without user)', async () => {
    const stopFn = jest.fn();
    metricsService.startTimerForShortenRequest.mockReturnValue(stopFn);
    loadUrlRepo.findOne.mockResolvedValueOnce(null);
    createUrlRepo.create.mockResolvedValueOnce({
      ...shortUrlMock,
      userId: undefined,
    });

    const result = await service.execute({
      originalUrl: 'https://example.com',
    });

    expect(userService.execute).not.toHaveBeenCalled();
    expect(createUrlRepo.create).toHaveBeenCalledWith({
      originalUrl: 'https://example.com',
      shortCode: expect.any(String),
      user: undefined,
    });
    expect(result.userId).toBeUndefined();
    expect(stopFn).toHaveBeenCalled();
  });

  it('should throw BadRequestError if URL creation fails', async () => {
    const stopFn = jest.fn();
    metricsService.startTimerForShortenRequest.mockReturnValue(stopFn);
    loadUrlRepo.findOne.mockResolvedValueOnce(null);
    createUrlRepo.create.mockResolvedValueOnce(null);

    await expect(
      service.execute({ originalUrl: 'https://example.com' }),
    ).rejects.toThrow(BadRequestError);

    expect(stopFn).toHaveBeenCalled();
  });

  it('should retry code generation if a duplicate code is found', async () => {
    const stopFn = jest.fn();
    metricsService.startTimerForShortenRequest.mockReturnValue(stopFn);
    loadUrlRepo.findOne
      .mockResolvedValueOnce({ ...shortUrlMock, shortCode: 'abc123' }) // code already exists
      .mockResolvedValueOnce(null);

    createUrlRepo.create.mockResolvedValueOnce({
      ...shortUrlMock,
      shortCode: 'def456',
    });

    const result = await service.execute({
      originalUrl: 'https://example.com',
    });

    expect(loadUrlRepo.findOne).toHaveBeenCalledTimes(2);
    expect(result.shortenerUrl).toBe('http://localhost/def456');
  });
});
