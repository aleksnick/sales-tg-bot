import dotenv from 'dotenv';
import { ENV_PATH, DEFAULT_PORT } from 'n-config';
import express from 'express';
import { Telegraf } from 'telegraf';
import { MenuTemplate, MenuMiddleware } from 'telegraf-inline-menu';
import { getData } from 'n-shared';

dotenv.config({
    path: ENV_PATH
});

const expressApp = express();
const port = process.env.PORT || DEFAULT_PORT;
expressApp.get('/', (_req, res) => {
    res.send('Hello World!');
});
expressApp.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from?.first_name}!`);
menuTemplate.interact('I am excited!', 'a', {
    do: async (ctx) => {
        await ctx.reply('As am I!');
        return false;
    }
});
const bot = new Telegraf(process.env.BOT_TOKEN);
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
