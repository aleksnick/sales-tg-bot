import { Module } from '@nestjs/common';
import { CatalogModule } from 'src/modules/Catalog/catalog.module';
import { TelegramMenuService } from './telegramMenu.service';

@Module({
  imports: [CatalogModule],
  providers: [TelegramMenuService],
  exports: [TelegramMenuService],
})
export class TelegramMenuModule {}
