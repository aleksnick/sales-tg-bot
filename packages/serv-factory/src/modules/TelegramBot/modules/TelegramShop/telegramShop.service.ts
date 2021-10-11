import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { TelegramMenuService } from './modules/TelegramMenu/telegramMenu.service';

@Injectable()
export class TelegramShopService {
  constructor(
    private readonly telegramMenuService: TelegramMenuService,
  ) {}

  registr = (bot: TelegramBotWorker) => {
    this.telegramMenuService.registr(bot);
  };
}
