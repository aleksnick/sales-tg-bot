import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { CatalogService } from 'src/modules/Catalog/catalog.service';
import registrMenu from './utils/registrMenu';
import createMainMenu from './templates/Main';

@Injectable()
export class TelegramMenuService {
  constructor(private readonly catalogService: CatalogService) {}

  registr = (bot: TelegramBotWorker) => {
    const categories = this.catalogService.getCategories();
    console.log('>>> categories', categories);

    registrMenu(createMainMenu({
      categories,
    }))(bot);
  };
}
