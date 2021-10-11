import { BotType, BotChannel } from 'shared-types';
import { BotOptions } from 'src/@types/Bot';

export interface CreateOptions extends BotOptions {
  channel: BotChannel;
  type: BotType;
}
