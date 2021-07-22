import dotenv from 'dotenv';
import { ENV_PATH } from 'shared-constants';
import { NestFactory } from '@nestjs/core';
// import { BotTypes } from 'shared-constants';
import { AppModule } from 'src/app.module';

dotenv.config({
  path: ENV_PATH,
});

// const config = [
//   {
//     type: BotTypes.TELEGRAM,
//     id: '1',
//     token: process.env.BOT_TOKEN!,
//   },
// ];

// factory.createBots(config);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || process.env.FACTORY_PORT!);
}
bootstrap();
