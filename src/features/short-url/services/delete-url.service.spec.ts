import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUrlService } from './delete-url.service';
import {
  IGetUrlByParamServiceToken,
  ShortUrlResponse,
} from '../interfaces/services/get-url-by-param-service.interface';
import { IDeleteUrlRepositoryToken } from '../interfaces/repositories/delete-url-repository.interface';
import { NotFoundError } from '../../../common/errors/not-found-error/not-found-error';
import { UnauthorizedError } from '../../../common/errors/unauthorized-error/unauthorized-error';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;
  let getUrlService: { execute: jest.Mock };
  let urlRepo: { delete: jest.Mock };

  const urlMock: ShortUrlResponse = {
    id: 'abc123',
    originalUrl: 'https://example.com',
    shortenerUrl: 'http://localhost/abc123',
    userId: 'user-1',
    clicks: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    getUrlService = {
      execute: jest.fn(),
    };

    urlRepo = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUrlService,
        {
          provide: IGetUrlByParamServiceToken,
          useValue: getUrlService,
        },
        {
          provide: IDeleteUrlRepositoryToken,
          useValue: urlRepo,
        },
      ],
    }).compile();

    service = module.get(DeleteUrlService);
  });

  it('should delete a URL if it exists and belongs to the user', async () => {
    getUrlService.execute.mockResolvedValue(urlMock);

    await service.execute('abc123', 'user-1');

    expect(getUrlService.execute).toHaveBeenCalledWith({ id: 'abc123' });
    expect(urlRepo.delete).toHaveBeenCalledWith('abc123');
  });

  it('should throw NotFoundError if URL does not exist', async () => {
    getUrlService.execute.mockResolvedValue(null);

    await expect(service.execute('abc123', 'user-1')).rejects.toThrow(
      NotFoundError,
    );
    expect(urlRepo.delete).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedError if URL belongs to another user', async () => {
    getUrlService.execute.mockResolvedValue({ ...urlMock, userId: 'user-2' });

    await expect(service.execute('abc123', 'user-1')).rejects.toThrow(
      UnauthorizedError,
    );
    expect(urlRepo.delete).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedError if URL has no userId', async () => {
    getUrlService.execute.mockResolvedValue({ ...urlMock, userId: undefined });

    await expect(service.execute('abc123', 'user-1')).rejects.toThrow(
      UnauthorizedError,
    );
    expect(urlRepo.delete).not.toHaveBeenCalled();
  });
});
