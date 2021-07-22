import { TelegramBotWorker } from './TelegramBotWorker';

export type RegistrMiddleWare = (bot: TelegramBotWorker) => void;
