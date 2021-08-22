import { Module } from '@nestjs/common';
import { TelegramMenuModule } from 'src/modules/TelegramMenu/telegramMenu.module';
import { TelegramPhrasesModule } from 'src/modules/TelegramPhrases/telegramPhrases.module';
import { TelegramSessionModule } from 'src/modules/TelegramSession/telegramSession.module';
import { TelegramBotService } from './telegramBot.service';

@Module({
  imports: [TelegramMenuModule, TelegramSessionModule, TelegramPhrasesModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
