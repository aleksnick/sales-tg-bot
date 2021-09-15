import { Injectable } from '@nestjs/common';
// import { Context } from 'src/@types/Context';
import { MenuMiddleware } from 'lib-telegraf-inline-menu';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { CatalogService } from 'src/modules/Catalog/catalog.service';
import { MenuStates, MenuState } from 'src/@types/MenuState';
import createMainMenu from './templates/Main';

@Injectable()
export class TelegramMenuService {
  private state: MenuState = MenuStates.MAIN;

  constructor(private readonly catalogService: CatalogService) {}

  registr = (bot: TelegramBotWorker) => {
    const categories = this.catalogService.getCategories();
    const wares = this.catalogService.getWares();

    const menu = createMainMenu({
      categories,
      wares,
      state: this.state,
      onChangeState: this.changeState,
    });

    const menuMiddleware = new MenuMiddleware('/', menu);
    console.log(menuMiddleware.tree());

    bot.command('start', async (ctx, next) => {
      await menuMiddleware.replyToContext(ctx);
      next();
    });

    bot.command('go', async (ctx, next) => {
      await menuMiddleware.replyToContext(ctx);
      next();
    });

    bot.use((ctx, next) => {
      if (ctx.callbackQuery) {
        console.log('callback data just happened', ctx.callbackQuery);
      }

      return next();
    });

    bot.use(menuMiddleware.middleware());
  };

  changeState = (newState: MenuStates) => {
    this.state = newState;
  };
}
