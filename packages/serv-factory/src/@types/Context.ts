import { Context as BaseContext } from 'telegraf';
import { MenuState } from './MenuState';

// export type DefaultContext = NarrowedContext<BaseContext<any> & {
//   match: RegExpExecArray;
// }, any> & {
//   i18n?: I18nContext;
// };

export interface Context extends BaseContext {
  menuState: MenuState | undefined | null;
}
