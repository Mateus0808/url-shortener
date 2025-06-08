import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUrlService } from './update-url.service';
import { IGetUrlByParamServiceToken } from '../interfaces/services/get-url-by-param-service.interface';
import { IUpdateUrlRepositoryToken } from '../interfaces/repositories/update-url-repository.interface';
import { UnauthorizedError } from '../../../common/errors/unauthorized-error/unauthorized-error';
import { BadRequestError } from '../../../common/errors/bad-request-error/bad-request-error';

describe('UpdateUrlService', () => {
  let service: UpdateUrlService;
  let getUrlService: { execute: jest.Mock };
  let updateUrlRepo: { update: jest.Mock };

  const existingUrl = {
    id: '1',
    userId: 'user-1',
    originalUrl: 'https://example.com',
    shortCode: 'abc123',
    clicks: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const updatedUrl = {
    ...existingUrl,
    originalUrl: 'https://updated.com'
  };

  beforeEach(async () => {
    getUrlService = { execute: jest.fn() };
    updateUrlRepo = { update: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUrlService,
        { provide: IGetUrlByParamServiceToken, useValue: getUrlService },
        { provide: IUpdateUrlRepositoryToken, useValue: updateUrlRepo }
      ]
    }).compile();

    service = module.get(UpdateUrlService);
  });

  it('should update the URL if the user is the owner', async () => {
    getUrlService.execute.mockResolvedValue(existingUrl);
    updateUrlRepo.update.mockResolvedValue(updatedUrl);

    const result = await service.execute(
      { id: '1', data: { originalUrl: 'https://updated.com' } },
      'user-1'
    );

    expect(getUrlService.execute).toHaveBeenCalledWith({ id: '1' });
    expect(updateUrlRepo.update).toHaveBeenCalledWith('1', { originalUrl: 'https://updated.com' });
    expect(result).toEqual(updatedUrl);
  });

  it('should throw UnauthorizedError if the user does not own the URL', async () => {
    getUrlService.execute.mockResolvedValue({ ...existingUrl, userId: 'other-user' });

    await expect(
      service.execute({ id: '1', data: { originalUrl: 'https://updated.com' } }, 'user-1')
    ).rejects.toThrow(UnauthorizedError);

    expect(updateUrlRepo.update).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError if update fails', async () => {
    getUrlService.execute.mockResolvedValue(existingUrl);
    updateUrlRepo.update.mockResolvedValue(null);

    await expect(
      service.execute({ id: '1', data: { originalUrl: 'https://updated.com' } }, 'user-1')
    ).rejects.toThrow(BadRequestError);
  });
});
