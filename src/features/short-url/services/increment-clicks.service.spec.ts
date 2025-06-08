import { Test, TestingModule } from '@nestjs/testing';
import { IncrementClickService } from './increment-clicks.service';
import { IGetUrlByParamServiceToken } from '../interfaces/services/get-url-by-param-service.interface';
import { IUpdateUrlRepositoryToken } from '../interfaces/repositories/update-url-repository.interface';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';

describe('IncrementClickService', () => {
  let service: IncrementClickService;
  let getUrlService: { execute: jest.Mock };
  let updateUrlRepo: { update: jest.Mock };

  const date = new Date();

  const urlMock = {
    id: 'url-123',
    shortCode: 'abc123',
    originalUrl: 'https://example.com',
    clicks: 5,
    createdAt: date,
    updatedAt: date,
    userId: 'user-1',
  };

  const updatedUrlMock = {
    ...urlMock,
    clicks: 6,
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    getUrlService = { execute: jest.fn() };
    updateUrlRepo = { update: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncrementClickService,
        {
          provide: IGetUrlByParamServiceToken,
          useValue: getUrlService,
        },
        {
          provide: IUpdateUrlRepositoryToken,
          useValue: updateUrlRepo,
        },
      ],
    }).compile();

    service = module.get(IncrementClickService);
  });

  it('should increment the click count and return updated URL', async () => {
    getUrlService.execute.mockResolvedValue(urlMock);
    updateUrlRepo.update.mockResolvedValue(updatedUrlMock);

    const result = await service.execute('abc123');

    expect(getUrlService.execute).toHaveBeenCalledWith({ shortCode: 'abc123' });
    expect(updateUrlRepo.update).toHaveBeenCalledWith('url-123', { clicks: 6 });

    expect(result).toEqual({
      id: updatedUrlMock.id,
      userId: updatedUrlMock.userId,
      shortenerUrl: `http://localhost/${updatedUrlMock.shortCode}`,
      originalUrl: updatedUrlMock.originalUrl,
      clicks: 6,
      createdAt: updatedUrlMock.createdAt,
      updatedAt: updatedUrlMock.updatedAt,
    });
  });

  it('should throw BadRequestError if update fails', async () => {
    getUrlService.execute.mockResolvedValue(urlMock);
    updateUrlRepo.update.mockResolvedValue(null);

    await expect(service.execute('abc123')).rejects.toThrow(BadRequestError);

    expect(getUrlService.execute).toHaveBeenCalledWith({ shortCode: 'abc123' });
    expect(updateUrlRepo.update).toHaveBeenCalledWith('url-123', { clicks: 6 });
  });
});
