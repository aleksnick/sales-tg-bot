import { Module } from '@nestjs/common';
import { TelegramWareMenuService } from './telegramWareMenu.service';

@Module({
  providers: [TelegramWareMenuService],
  exports: [TelegramWareMenuService],
})
export class TelegramWareMenuModule {}
