import { Injectable } from '@nestjs/common';
import { BotOptions } from 'src/@types/Bot';
import { TelegramSessionService } from './modules/TelegramSession/telegramSession.service';
import { TelegramMenuService } from './modules/TelegramMenu/telegramMenu.service';
import { TelegramPhrasesService } from './modules/TelegramPhrases/telegramPhrases.service';
import TelegramBot from './models/TelegramBot';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly telegramSessionService: TelegramSessionService,
    private readonly telegramPhrasesService: TelegramPhrasesService,
    private readonly telegramMenuService: TelegramMenuService,
  ) {}

  createBot = (options: BotOptions) => {
    const telegramBot = new TelegramBot(options);
    this.telegramSessionService.registr(telegramBot.bot);
    this.telegramPhrasesService.registr(telegramBot.bot);
    this.telegramMenuService.registr(telegramBot.bot);
    return telegramBot;
  };
}
