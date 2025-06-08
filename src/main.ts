import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/errors/not-found-error/not-found-error.filter';
import { AlreadyExistsErrorFilter } from './common/errors/already-exists-error/already-exists-error.filter';
import { UnauthorizedErrorFilter } from './common/errors/unauthorized-error/unauthorized-error.filter';
import { BadRequestErrorFilter } from './common/errors/bad-request-error/bad-request-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new AlreadyExistsErrorFilter(),
    new UnauthorizedErrorFilter(),
    new BadRequestErrorFilter()
  );

  app.useLogger(new Logger());

  await app.listen(3000);
}
bootstrap();
