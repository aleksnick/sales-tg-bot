import { Context as BaseContext } from 'telegraf';

export interface Context extends BaseContext {
  menuState: string;
}
