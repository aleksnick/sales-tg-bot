import { Injectable } from '@nestjs/common';
import LocalSession from 'telegraf-session-local';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';

@Injectable()
export class TelegramSessionService {
  registr = (bot: TelegramBotWorker) => {
    bot.use((new LocalSession({ database: 'example_db.json' })).middleware());
  };
}
