import { Module } from '@nestjs/common';
import { BotChannels, BotTypes } from 'shared-types';
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
        channel: BotChannels.TELEGRAM,
        type: BotTypes.SHOP,
        token: process.env.BOT_TOKEN!,
      },
    ]);
  }
}
