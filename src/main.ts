import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';

const port = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  Logger.log(`server running on http://localhost:${port}`, 'bootsrap');
}
bootstrap();
