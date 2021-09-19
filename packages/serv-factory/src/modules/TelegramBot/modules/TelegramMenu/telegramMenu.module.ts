import { Module } from '@nestjs/common';
import { CatalogModule } from 'src/modules/Catalog/catalog.module';
import { TelegramMainMenuModule } from './modules/TelegramMainMenu/telegramMainMenu.module';
import { TelegramWareMenuModule } from './modules/TelegramWareMenu/telegramWareMenu.module';
import { TelegramMenuService } from './telegramMenu.service';

@Module({
  imports: [CatalogModule, TelegramMainMenuModule, TelegramWareMenuModule],
  providers: [TelegramMenuService],
  exports: [TelegramMenuService],
})
export class TelegramMenuModule {}
