import { Telegraf, Context as BaseContext } from 'telegraf';
import {MenuTemplate, MenuMiddleware} from 'telegraf-inline-menu';
import { getData } from 'n-shared';

const menuTemplate = new MenuTemplate<BaseContext>(ctx => `Hey ${ctx.from?.first_name}!`)

menuTemplate.interact('I am excited!', 'a', {
	do: async ctx => {
		await ctx.reply('As am I!');
		return false;
	}
});

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id);
});

// bot.on('text', (ctx) => {
//   console.log(ctx.update.message.from);
//   ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.update.message.from.username}`);
// });

const menuMiddleware = new MenuMiddleware('/', menuTemplate);

bot.command('start', ctx => menuMiddleware.replyToContext(ctx));
bot.use(menuMiddleware);

bot.catch(error => {
	console.log('telegraf error', error);
});

async function startup() {
	await bot.launch();
	console.log(new Date(), 'Bot started as', bot.botInfo?.username);
}

startup();

console.log('data', getData());
