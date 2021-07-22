import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionManager } from './common/lib/exceptions-manager.filter';
import { AppModule } from './app.module';
import rTracer = require('cls-rtracer');
import generalConfig from './common/configuration/general.config';

const info = require('../package.json');

async function bootstrap() {
  const port = generalConfig.port;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.use(rTracer.expressMiddleware());
  app.useGlobalFilters(new ExceptionManager());

  const swaggerconfig = new DocumentBuilder()
    .setTitle(info.name)
    .setDescription(info.description)
    .setVersion(info.version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port, () =>
    Logger.log(`Microservice is listening on port ${port}`),
  );
}
bootstrap();
