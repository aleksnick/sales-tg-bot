import { Module } from '@nestjs/common';
import { TelegramMenuModule } from './modules/TelegramMenu/telegramMenu.module';
import { TelegramPhrasesModule } from './modules/TelegramPhrases/telegramPhrases.module';
import { TelegramSessionModule } from './modules/TelegramSession/telegramSession.module';
import { TelegramBotService } from './telegramBot.service';

@Module({
  imports: [TelegramMenuModule, TelegramSessionModule, TelegramPhrasesModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
