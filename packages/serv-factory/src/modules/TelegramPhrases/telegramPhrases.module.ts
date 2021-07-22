import { Module } from '@nestjs/common';
import { TelegramPhrasesService } from './telegramPhrases.service';

@Module({
  providers: [TelegramPhrasesService],
  exports: [TelegramPhrasesService],
})
export class TelegramPhrasesModule {}
