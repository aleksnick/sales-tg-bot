import { Context as BaseContext } from 'telegraf';
import { MenuState } from './MenuState';

interface CallbackPayload {
  command: string;
  menuID: string;
  buttonID: string;
  dynamic?: string;
}

// export type DefaultContext = NarrowedContext<BaseContext<any> & {
//   match: RegExpExecArray;
// }, any> & {
//   i18n?: I18nContext;
// };

export interface Context extends BaseContext {
  menuState: MenuState | undefined | null;
  session?: {
    editTarget?: CallbackPayload;
    menuMessageID?: number;
    dynamicMenuMap?: Record<number, any>;
    nextMenuID?: number;
    messageMap?: Record<string, number>;
  };
}
