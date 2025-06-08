import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './features/user/user.module';
import { DatabaseConfigService } from './config/database.config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './features/auth/auth.module';
import { ShortUrlModule } from './features/short-url/short-url.module';
import { MetricsModule } from './features/metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService
    }),
    UserModule, AuthModule, ShortUrlModule, MetricsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    
  ],
})
export class AppModule {}
