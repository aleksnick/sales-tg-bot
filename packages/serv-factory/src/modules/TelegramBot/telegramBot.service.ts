import { Injectable } from '@nestjs/common';
import { BotOptions } from 'src/@types/Bot';
import { TelegramMenuService } from 'src/modules/TelegramMenu/telegramMenu.service';
import { TelegramPhrasesService } from 'src/modules/TelegramPhrases/telegramPhrases.service';
import TelegramBot from './models/TelegramBot';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly telegramPhrasesService: TelegramPhrasesService,
    private readonly telegramMenuService: TelegramMenuService,
  ) {}

  createBot = (options: BotOptions) => {
    const telegramBot = new TelegramBot(options);
    this.telegramPhrasesService.registr(telegramBot.bot);
    this.telegramMenuService.registr(telegramBot.bot);
    return telegramBot;
  };
}
