import { Context } from 'telegraf';
import { MenuTemplate, MenuMiddleware } from 'telegraf-inline-menu';

const createMenuMiddleware = () => {
  const menuTemplate = new MenuTemplate<Context>((ctx) => `Hey ${ctx.from?.first_name}!`);

  menuTemplate.interact('I am excited!', 'a', {
    do: async (ctx) => {
      await ctx.reply('As am I!');
      return false;
    },
  });

  return new MenuMiddleware('/', menuTemplate);
};

export default createMenuMiddleware;
