import { Module } from '@nestjs/common';
import { TelegramSessionService } from './telegramSession.service';

@Module({
  providers: [TelegramSessionService],
  exports: [TelegramSessionService],
})
export class TelegramSessionModule {}
