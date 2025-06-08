import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { UserModule } from '../user/user.module';
import { ICreateShortUrlServiceToken } from './interfaces/services/create-short-url-service.interface';
import { CreateShortUrlService } from './services/create-short-url.service';
import { ShortUrlDatabaseModule } from './repositories/short-url-database.module';
import { IGetUrlByParamServiceToken } from './interfaces/services/get-url-by-param-service.interface';
import { GetShortUrlByParamService } from './services/get-short-url.service';
import { DeleteUrlService } from './services/delete-url.service';
import { IDeleteUrlServiceToken } from './interfaces/services/delete-url-service.interface';
import { ListUrlsByUserService } from './services/list-urls-by-user.service';
import { IListUrlsByUserServiceToken } from './interfaces/services/list-url-service.interface';
import { UpdateUrlService } from './services/update-url.service';
import { IUpdateUrlServiceToken } from './interfaces/services/update-url-service.interface';
import { IIncrementClickServiceToken } from './interfaces/services/increment-clicks-service.interface';
import { IncrementClickService } from './services/increment-clicks.service';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [UserModule, ShortUrlDatabaseModule, MetricsModule],
  controllers: [ShortUrlController],
  providers: [
    {
      provide: ICreateShortUrlServiceToken,
      useClass: CreateShortUrlService,
    },
    {
      provide: IGetUrlByParamServiceToken,
      useClass: GetShortUrlByParamService,
    },
    {
      provide: IListUrlsByUserServiceToken,
      useClass: ListUrlsByUserService,
    },
    {
      provide: IUpdateUrlServiceToken,
      useClass: UpdateUrlService,
    },
    {
      provide: IDeleteUrlServiceToken,
      useClass: DeleteUrlService,
    },
    {
      provide: IIncrementClickServiceToken,
      useClass: IncrementClickService,
    },
  ],
  exports: [],
})
export class ShortUrlModule {}
