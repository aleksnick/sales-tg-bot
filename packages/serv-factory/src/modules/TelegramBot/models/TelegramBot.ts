import { Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from 'src/@types/Context';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { Bot, BotOptions } from 'src/@types/Bot';

export interface TelegramBotOptions extends BotOptions {}

class TelegramBot implements Bot {
  private readonly logger = new Logger(TelegramBot.name);

  public bot: TelegramBotWorker;

  constructor({ token }: TelegramBotOptions) {
    const bot = new Telegraf<Context>(token);

    bot.command('quit', (ctx) => {
      ctx.telegram.leaveChat(ctx.message.chat.id);
    });

    bot.catch((error) => {
      this.logger.error('telegraf error', error);
    });

    this.bot = bot;
  }

  public start = async (): Promise<void> => {
    const { bot } = this;

    if (!bot) {
      return;
    }

    await bot.launch();

    this.logger.verbose(`Bot started as '${bot.botInfo?.username}'`);
  };
}

export default TelegramBot;
