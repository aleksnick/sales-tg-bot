import { Module } from '@nestjs/common';
import { BotTypes } from 'shared-types';
import { TelegramBotModule } from 'src/modules/TelegramBot/telegramBot.module';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';

@Module({
  imports: [TelegramBotModule],
  controllers: [FactoryController],
  providers: [FactoryService],
})
export class FactoryModule {
  constructor(private readonly factoryService: FactoryService) {
    this.factoryService.createBots([
      {
        id: '1',
        type: BotTypes.TELEGRAM,
        token: process.env.BOT_TOKEN!,
      },
    ]);
  }
}
