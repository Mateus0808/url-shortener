import { Test, TestingModule } from '@nestjs/testing';
import { ListUrlsByUserService } from './list-urls-by-user.service';
import { IListUrlsRepositoryToken } from '../interfaces/repositories/list-url-repository.interface';
import { ShortUrlDatabase } from '../interfaces/entities/short-url-db.entity';

describe('ListUrlsByUserService', () => {
  let service: ListUrlsByUserService;
  let urlRepo: { findAllByUser: jest.Mock };

  const date = new Date();

  const urlsMock: ShortUrlDatabase[] = [
    {
      id: '1',
      userId: 'user-1',
      originalUrl: 'https://example.com/1',
      shortCode: 'abc123',
      clicks: 3,
      createdAt: date,
      updatedAt: date,
    },
    {
      id: '2',
      userId: 'user-1',
      originalUrl: 'https://example.com/2',
      shortCode: 'def456',
      clicks: 7,
      createdAt: date,
      updatedAt: date,
    },
  ];

  beforeEach(async () => {
    urlRepo = {
      findAllByUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUrlsByUserService,
        {
          provide: IListUrlsRepositoryToken,
          useValue: urlRepo,
        },
      ],
    }).compile();

    service = module.get(ListUrlsByUserService);
  });

  it('should return a list of ShortUrlResponse for the user', async () => {
    urlRepo.findAllByUser.mockResolvedValue(urlsMock);

    const result = await service.execute('user-1');

    expect(urlRepo.findAllByUser).toHaveBeenCalledWith('user-1');
    expect(result).toEqual([
      {
        id: '1',
        userId: 'user-1',
        originalUrl: 'https://example.com/1',
        shortenerUrl: 'http://localhost/abc123',
        clicks: 3,
        createdAt: date,
        updatedAt: date,
      },
      {
        id: '2',
        userId: 'user-1',
        originalUrl: 'https://example.com/2',
        shortenerUrl: 'http://localhost/def456',
        clicks: 7,
        createdAt: date,
        updatedAt: date,
      },
    ]);
  });

  it('should return an empty array if no URLs are found', async () => {
    urlRepo.findAllByUser.mockResolvedValue([]);

    const result = await service.execute('user-1');

    expect(urlRepo.findAllByUser).toHaveBeenCalledWith('user-1');
    expect(result).toEqual([]);
  });
});
