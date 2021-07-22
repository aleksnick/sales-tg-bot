import { Module } from '@nestjs/common';
import { TelegramMenuService } from './telegramMenu.service';

@Module({
  providers: [TelegramMenuService],
  exports: [TelegramMenuService],
})
export class TelegramMenuModule {}
