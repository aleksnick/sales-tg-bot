import { MenuMiddleware } from 'telegraf-inline-menu';
import { RegistrMiddleWare } from 'src/@types/Middleware';
import { MenuCreator } from '../@types/Menu';

const registrMenuMiddleware = (createMenu: MenuCreator): RegistrMiddleWare => (bot) => {
  const menuMiddleware = new MenuMiddleware('/', createMenu());

  bot.command('start', (ctx, next) => {
    menuMiddleware.replyToContext(ctx);
    next();
  });

  bot.use(menuMiddleware.middleware());
};

export default registrMenuMiddleware;
