import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/errors/not-found-error/not-found-error.filter';
import { AlreadyExistsErrorFilter } from './common/errors/already-exists-error/already-exists-error.filter';
import { UnauthorizedErrorFilter } from './common/errors/unauthorized-error/unauthorized-error.filter';
import { BadRequestErrorFilter } from './common/errors/bad-request-error/bad-request-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('api');
  app.enableCors();

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
    new BadRequestErrorFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('Documentação da API de encurtador de URL')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useLogger(new Logger());

  await app.listen(3000);
}
bootstrap();
