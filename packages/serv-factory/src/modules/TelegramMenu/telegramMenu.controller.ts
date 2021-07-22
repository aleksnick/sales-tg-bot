import { Context } from 'telegraf';
import { MenuTemplate, MenuMiddleware } from 'telegraf-inline-menu';
import { RegistrMiddleWare } from 'src/@types/Middleware';

const registrMenuMiddleware: RegistrMiddleWare = (bot) => {
  const menuTemplate = new MenuTemplate<Context>((ctx) => `Hey ${ctx.from?.first_name}!`);

  menuTemplate.interact('I am excited!', 'a', {
    do: async (ctx) => {
      await ctx.reply('As am I!');
      return false;
    },
  });

  const menuMiddleware = new MenuMiddleware('/', menuTemplate);

  bot.command('start', (ctx) => menuMiddleware.replyToContext(ctx));

  bot.use(menuMiddleware.middleware());
};

export default registrMenuMiddleware;
