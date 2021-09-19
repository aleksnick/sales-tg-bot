import { Injectable } from '@nestjs/common';
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

    createMainMenu(bot, {
      categories,
      wares,
      state: this.state,
      onChangeState: this.changeState,
    });

    bot.use((ctx, next) => {
      if (ctx.callbackQuery) {
        console.log('callback data just happened', ctx.callbackQuery);
      }

      return next();
    });
  };

  changeState = (newState: MenuStates) => {
    this.state = newState;
  };
}
