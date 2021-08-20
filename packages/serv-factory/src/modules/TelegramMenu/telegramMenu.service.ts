import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { MenuMiddleware } from 'telegraf-inline-menu';
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
    console.log('>>> categories', categories);

    const menu = createMainMenu({
      categories,
      wares,
      state: this.state,
      onChangeState: this.changeState,
    });

    const menuMiddleware = new MenuMiddleware('/', menu);

    bot.command('start', async (ctx, next) => {
      await menuMiddleware.replyToContext(ctx);

      console.log(menuMiddleware.tree());

      next();
    });

    bot.use(menuMiddleware.middleware());
  };

  changeState = (newState: MenuStates) => {
    this.state = newState;
  };
}
