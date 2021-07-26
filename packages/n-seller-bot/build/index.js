import dotenv from 'dotenv';
import { ENV_PATH, DEFAULT_PORT } from 'n-config';
import express from 'express';
import { Telegraf } from 'telegraf';
import getData from 'n-shared';
import { MenuMiddleware, MenuTemplate } from 'telegraf-inline-menu';
import _ from 'lodash';

dotenv.config({
    path: ENV_PATH,
});

const expressApp = express();
const port = process.env.PORT || DEFAULT_PORT;
expressApp.get('/', (_req, res) => {
    res.send('Hello World!');
});
expressApp.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const createMenuMiddleware = () => {
    const menuTemplate = new MenuTemplate((ctx) => `Hey ${ctx.from?.first_name}!`);
    menuTemplate.interact('I am excited!', 'a', {
        do: async (ctx) => {
            await ctx.reply('As am I!');
            return false;
        },
    });
    return new MenuMiddleware('/', menuTemplate);
};

const anyPhrase = _.flow(_.shuffle, _.head);

const phrases = [
    {
        regExp: [/привет/i, /здарова/i],
        res: () => anyPhrase(['Добрый день!', 'Привет!', 'Приветствую!', 'Здравсвуйте!']),
    },
    {
        regExp: [/как дела/i, /как сам/i],
        res: () => anyPhrase(['Замечательно!', 'Норм', 'Неплохо', 'Лучше всех', 'Супер!']),
    },
    {
        regExp: [/что делаешь/i, /чем занимаешься/i],
        res: () => anyPhrase([
            'работаю',
            'тружусь',
            'как всегда - работаю',
            'тружусь в поте лица',
        ]),
    },
];

const bot = new Telegraf(process.env.BOT_TOKEN);
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
