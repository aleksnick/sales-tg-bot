import { Module } from '@nestjs/common';
import { TelegramMenuModule } from './modules/TelegramMenu/telegramMenu.module';
import { TelegramShopService } from './telegramShop.service';

@Module({
  imports: [TelegramMenuModule],
  providers: [TelegramShopService],
  exports: [TelegramShopService],
})
export class TelegramShopModule {}
