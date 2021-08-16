import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { MenuMiddleware, replyMenuToContext } from 'telegraf-inline-menu';
import { CatalogService } from 'src/modules/Catalog/catalog.service';
import createMainMenu from './templates/Main';
import createCatalogMenu from './templates/Catalog';

@Injectable()
export class TelegramMenuService {
  constructor(private readonly catalogService: CatalogService) {}

  registr = (bot: TelegramBotWorker) => {
    const categories = this.catalogService.getCategories();
    console.log('>>> categories', categories);

    const menu = createMainMenu({
      categories,
    });

    const menuMiddleware = new MenuMiddleware('/', menu);

    bot.command('start', async (ctx, next) => {
      await menuMiddleware.replyToContext(ctx);
      await ctx.replyWithPhoto('https://static.tildacdn.com/tild6234-6531-4232-b337-633564303938/IMG_6151.JPG', {
        caption: 'костюм "Милый сын"',
      });
      await replyMenuToContext(createCatalogMenu(), ctx, '/settings/');
      next();
    });

    bot.use(menuMiddleware.middleware());
  };
}
