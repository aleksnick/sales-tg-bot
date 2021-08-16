import { Context as BaseContext } from 'telegraf';
import { MenuState } from './MenuState';

export interface Context extends BaseContext {
  menuState: MenuState | undefined | null;
}
