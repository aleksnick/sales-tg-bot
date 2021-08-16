import { MenuMiddleware } from 'telegraf-inline-menu';
import { RegistrMiddleWare } from 'src/@types/Middleware';
import { Menu } from '../@types/Menu';

const registrMenuMiddleware = (menu: Menu): RegistrMiddleWare => (bot) => {
  const menuMiddleware = new MenuMiddleware('/', menu);

  bot.command('start', (ctx, next) => {
    menuMiddleware.replyToContext(ctx);
    next();
  });

  bot.use(menuMiddleware.middleware());
};

export default registrMenuMiddleware;
