import { Telegraf } from 'telegraf';
import getData from 'n-shared';
import createMenuMiddleware from './menu';
import phrases from './phrases';

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id);
});

bot.on('text', async (ctx, next) => {
  console.log(ctx.message);
  const phrase = phrases.find((p) => p.regExp.some((r) => ctx.message.text.match(r)));
  if (phrase) {
    ctx.telegram.sendMessage(ctx.message.chat.id, phrase.res());
  }
  await next();
});

const menuMiddleware = createMenuMiddleware();

bot.command('start', (ctx) => menuMiddleware.replyToContext(ctx));

bot.use(menuMiddleware);

bot.catch((error) => {
  console.log('telegraf error', error);
});

async function startup() {
  await bot.launch();
  console.log(new Date(), 'Bot started as', bot.botInfo?.username);
}

startup();

console.log('data', getData());
