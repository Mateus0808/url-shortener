import { Test, TestingModule } from '@nestjs/testing';
import { GetShortUrlByParamService } from './get-short-url.service';
import { ILoadUrlByParamRepositoryToken } from '../interfaces/repositories/load-url-repository.interface';
import { NotFoundError } from '../../../common/errors/not-found-error/not-found-error';

describe('GetShortUrlByParamService', () => {
  let service: GetShortUrlByParamService;
  let urlRepository: { findOne: jest.Mock };

  const urlMock = {
    id: 'url-1',
    userId: 'user-1',
    originalUrl: 'https://example.com',
    shortCode: 'abc123',
    clicks: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    urlRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetShortUrlByParamService,
        {
          provide: ILoadUrlByParamRepositoryToken,
          useValue: urlRepository,
        },
      ],
    }).compile();

    service = module.get(GetShortUrlByParamService);
  });

  it('should return the short URL if found - with id', async () => {
    urlRepository.findOne.mockResolvedValue(urlMock);

    const result = await service.execute({ id: 'url-1' });

    expect(urlRepository.findOne).toHaveBeenCalledWith({ id: 'url-1' });
    expect(result).toEqual({
      id: urlMock.id,
      userId: urlMock.userId,
      shortenerUrl: `http://localhost/${urlMock.shortCode}`,
      originalUrl: urlMock.originalUrl,
      clicks: urlMock.clicks,
      createdAt: urlMock.createdAt,
      updatedAt: urlMock.updatedAt,
    });
  });

  it('should return the short URL if found - with shortCode', async () => {
    urlRepository.findOne.mockResolvedValue(urlMock);

    const result = await service.execute({ shortCode: 'abc123' });

    expect(urlRepository.findOne).toHaveBeenCalledWith({ shortCode: 'abc123' });
    expect(result).toEqual({
      id: urlMock.id,
      userId: urlMock.userId,
      shortenerUrl: `http://localhost/${urlMock.shortCode}`,
      originalUrl: urlMock.originalUrl,
      clicks: urlMock.clicks,
      createdAt: urlMock.createdAt,
      updatedAt: urlMock.updatedAt,
    });
  });

  it('should throw NotFoundError if URL is not found - with id', async () => {
    urlRepository.findOne.mockResolvedValue(null);

    await expect(service.execute({ id: 'idnotfound123' })).rejects.toThrow(
      NotFoundError,
    );

    expect(urlRepository.findOne).toHaveBeenCalledWith({ id: 'idnotfound123' });
  });

  it('should throw NotFoundError if URL is not found - with shortCode', async () => {
    urlRepository.findOne.mockResolvedValue(null);

    await expect(service.execute({ shortCode: 'notfound123' })).rejects.toThrow(
      NotFoundError,
    );

    expect(urlRepository.findOne).toHaveBeenCalledWith({
      shortCode: 'notfound123',
    });
  });
});
