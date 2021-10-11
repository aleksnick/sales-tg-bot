import { Injectable } from '@nestjs/common';
import { BotOptions } from 'src/@types/Bot';
import { TelegramSessionService } from './modules/TelegramSession/telegramSession.service';
import { TelegramShopService } from './modules/TelegramShop/telegramShop.service';
import { TelegramPhrasesService } from './modules/TelegramPhrases/telegramPhrases.service';
import TelegramBot from './models/TelegramBot';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly telegramSessionService: TelegramSessionService,
    private readonly telegramPhrasesService: TelegramPhrasesService,
    private readonly telegramShopService: TelegramShopService,
  ) {}

  createBot = (options: BotOptions) => {
    const telegramBot = new TelegramBot(options);
    this.telegramSessionService.registr(telegramBot.bot);
    this.telegramPhrasesService.registr(telegramBot.bot);
    this.telegramShopService.registr(telegramBot.bot);
    return telegramBot;
  };
}
