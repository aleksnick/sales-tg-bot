import dotenv from 'dotenv';
import { ENV_PATH } from 'shared-constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

dotenv.config({
  path: ENV_PATH,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || process.env.FACTORY_PORT!);
}
bootstrap();
