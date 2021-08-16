import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import registrPhrases from './utils/registrPhrases';

@Injectable()
export class TelegramPhrasesService {
  registr = (bot: TelegramBotWorker) => registrPhrases(bot);
}
