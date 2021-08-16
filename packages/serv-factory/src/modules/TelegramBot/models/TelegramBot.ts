import { Telegraf } from 'telegraf';
import { Context } from 'src/@types/Context';
// import { getDataFromTildaYML } from 'shared';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { Bot, BotOptions } from 'src/@types/Bot';

export interface TelegramBotOptions extends BotOptions {}

class TelegramBot implements Bot {
  public bot: TelegramBotWorker;

  constructor({ token }: TelegramBotOptions) {
    const bot = new Telegraf<Context>(token);

    bot.command('quit', (ctx) => {
      ctx.telegram.leaveChat(ctx.message.chat.id);
    });

    bot.catch((error) => {
      console.log('telegraf error', error);
    });

    this.bot = bot;
  }

  public start = async (): Promise<void> => {
    const { bot } = this;

    if (!bot) {
      return;
    }

    await bot.launch();
    console.log(new Date(), `Bot started as '${bot.botInfo?.username}'`);
  };
}

export default TelegramBot;

// console.log('data', getDataFromTildaYML().offers.offer[0]);
