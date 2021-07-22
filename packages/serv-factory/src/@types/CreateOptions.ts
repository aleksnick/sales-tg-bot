import { BotType } from 'shared-constants';
import { BotOptions } from 'src/@types/Bot';

export interface CreateOptions extends BotOptions {
  type: BotType;
}
