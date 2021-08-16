import { Injectable } from '@nestjs/common';
import { BotTypes } from 'shared-types';
import { Bot } from 'src/@types/Bot';
import { CreateOptions } from 'src/@types/CreateOptions';
import { TelegramBotService } from 'src/modules/TelegramBot/telegramBot.service';

type Bots = { [id: string]: Bot };

@Injectable()
export class FactoryService {
  private readonly bots: Bots = {};

  constructor(private readonly telegramBotService: TelegramBotService) {}

  createBots = async (config: CreateOptions[]): Promise<void> => {
    config.forEach(async ({ id, type, ...options }) => {
      if (this.bots[id]) {
        return;
      }

      console.log('bot', id, type, BotTypes.TELEGRAM, options);
      if (type === BotTypes.TELEGRAM) {
        const bot = this.telegramBotService.createBot({
          id,
          ...options,
        });

        await bot.start();

        this.bots[id] = bot;
      }
    });

    console.log('bots', this.bots);
  };
}
