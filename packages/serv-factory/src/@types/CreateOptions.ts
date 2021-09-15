import { BotType } from 'shared-types';
import { BotOptions } from 'src/@types/Bot';

export interface CreateOptions extends BotOptions {
  type: BotType;
}
