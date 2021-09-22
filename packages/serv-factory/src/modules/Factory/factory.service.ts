import { Injectable, Logger } from '@nestjs/common';
import { BotTypes } from 'shared-types';
import { Bot } from 'src/@types/Bot';
import { CreateOptions } from 'src/@types/CreateOptions';
import { TelegramBotService } from 'src/modules/TelegramBot/telegramBot.service';

type Bots = { [id: string]: Bot };

@Injectable()
export class FactoryService {
  private readonly logger = new Logger(FactoryService.name);

  private readonly bots: Bots = {};

  constructor(private readonly telegramBotService: TelegramBotService) {}

  createBots = async (config: CreateOptions[]): Promise<void> => {
    config.forEach(async ({ id, type, ...options }) => {
      if (this.bots[id]) {
        return;
      }

      this.logger.debug('create bot', {
        id,
        type,
        options,
      });

      if (type === BotTypes.TELEGRAM) {
        const bot = this.telegramBotService.createBot({
          id,
          ...options,
        });

        await bot.start();

        this.bots[id] = bot;
      }
    });
  };
}
