import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import phrases from './phrases';

@Injectable()
export class TelegramPhrasesService {
  registr = (bot: TelegramBotWorker) => {
    bot.on('text', async (ctx, next) => {
      const phrase = phrases.find((p) => p.regExp.some((r) => ctx.message.text.match(r)));

      if (phrase) {
        await ctx.telegram.sendMessage(ctx.message.chat.id, phrase.res());
      }

      next();
    });
  };
}
