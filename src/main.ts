import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import rTracer = require('cls-rtracer')
import { ExceptionManager } from './common/lib/exceptions-manager.filter';
import generalConfig from './common/configuration/general.config';

async function bootstrap() {
  const port = generalConfig.port;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true
  });

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, forbidNonWhitelisted: true, whitelist: true }));
  app.use(rTracer.expressMiddleware())
  app.useGlobalFilters(new ExceptionManager());

  const swaggerconfig = new DocumentBuilder()
    .setTitle('Api Template example')
    .setDescription('The template API description')
    .setVersion('1.0')
    .addTag('Ecommerce V9')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port, () => Logger.log(`Microservice is listening on port ${port}`));
}
bootstrap();
