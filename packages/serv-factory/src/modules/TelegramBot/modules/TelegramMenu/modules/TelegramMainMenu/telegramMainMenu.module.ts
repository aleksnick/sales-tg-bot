import { Module } from '@nestjs/common';
import { TelegramMainMenuService } from './telegramMainMenu.service';

@Module({
  providers: [TelegramMainMenuService],
  exports: [TelegramMainMenuService],
})
export class TelegramMainMenuModule {}
