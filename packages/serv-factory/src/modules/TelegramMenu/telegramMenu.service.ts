import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import registrMenu from './telegramMenu.controller';

@Injectable()
export class TelegramMenuService {
  registr = (bot: TelegramBotWorker) => registrMenu(bot);
}
