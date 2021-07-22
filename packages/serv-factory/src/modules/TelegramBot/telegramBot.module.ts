import { Module } from '@nestjs/common';
import { TelegramMenuModule } from 'src/modules/TelegramMenu/telegramMenu.module';
import { TelegramPhrasesModule } from 'src/modules/TelegramPhrases/telegramPhrases.module';
import { TelegramBotService } from './telegramBot.service';

@Module({
  imports: [TelegramMenuModule, TelegramPhrasesModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
