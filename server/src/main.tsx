import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
type port = {
  port: number;
};
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const server: port = config.get('server');

  const port = process.env.PORT || server.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
