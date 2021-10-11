import { Injectable, Logger } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { CatalogService } from 'src/modules/Catalog/catalog.service';
import { TelegramMainMenuService } from './modules/TelegramMainMenu/telegramMainMenu.service';
import { TelegramWareMenuService } from './modules/TelegramWareMenu/telegramWareMenu.service';

@Injectable()
export class TelegramMenuService {
  private readonly logger = new Logger(TelegramMenuService.name);

  constructor(
    private readonly catalogService: CatalogService,
    private telegramMainMenuService: TelegramMainMenuService,
    private telegramWareMenuService: TelegramWareMenuService,
  ) {}

  registr = (bot: TelegramBotWorker) => {
    const categories = this.catalogService.getCategories();
    const wares = this.catalogService.getWares();

    this.telegramMainMenuService.createMenu(bot, {
      categories,
      wares,
    });

    this.telegramWareMenuService.createMenu(bot, {
      wares,
    });

    bot.use((ctx, next) => {
      if (ctx.callbackQuery) {
        this.logger.debug('callback data just happened', ctx.callbackQuery);
      }

      return next();
    });
  };
}
