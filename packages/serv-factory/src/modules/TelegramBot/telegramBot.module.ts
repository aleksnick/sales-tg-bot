import { Module } from '@nestjs/common';
import { TelegramShopModule } from './modules/TelegramShop/telegramShop.module';
import { TelegramPhrasesModule } from './modules/TelegramPhrases/telegramPhrases.module';
import { TelegramSessionModule } from './modules/TelegramSession/telegramSession.module';
import { TelegramBotService } from './telegramBot.service';

@Module({
  imports: [TelegramShopModule, TelegramSessionModule, TelegramPhrasesModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
