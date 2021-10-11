import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { Category, CategoryId, Ware } from 'shared-types';
import { findWaresByCategoryId } from 'shared-utils';
import { Context } from 'src/@types/Context';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import {
  MenuActions,
  ShowCategory,
  ShowCart,
  ShowFavorite,
  ShowWare,
  ShowMain,
} from '../../@types/Actions';

const PREVIEW_LIMIT_IN_CATEGORY = 3;

interface MainMenuOptions {
  categories: Category[];
  wares: Ware[];
}

@Injectable()
export class TelegramMainMenuService {
  createMenu = (
    bot: TelegramBotWorker,
    { categories, wares }: MainMenuOptions,
  ) => {
    const onStart = async (ctx: Context, next: () => void) => {
      const categoryKeyboard = categories.map((category) => ({
        text: category.value,
        callback_data: JSON.stringify({
          action: MenuActions.SHOW_CATEGORY,
          categoryId: category.id,
        } as ShowCategory),
      }));

      await ctx.reply('выберите категорию', {
        reply_markup: {
          resize_keyboard: true,
          inline_keyboard: _.chunk(categoryKeyboard, 2),
        },
      });

      next();
    };

    bot.start(onStart);

    bot.command('go', onStart);

    bot.action(/action/, async (ctx, next) => {
      try {
        const data = JSON.parse(ctx.match.input) as ShowMain;

        if (data.action !== MenuActions.SHOW_MAIN) {
          throw new Error(`not a ${MenuActions.SHOW_MAIN}`);
        }
      } catch {
        next();

        return;
      }

      onStart(ctx, next);
    });

    bot.action(/action/, async (ctx, next) => {
      let categoryId: CategoryId;

      try {
        const data = JSON.parse(ctx.match.input) as ShowCategory;

        if (data.action !== MenuActions.SHOW_CATEGORY) {
          throw new Error(`not a ${MenuActions.SHOW_CATEGORY}`);
        }

        categoryId = data.categoryId;
      } catch {
        next();

        return;
      }

      const waresInCategory = findWaresByCategoryId(wares, categoryId);

      _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach(
        async (ware) => {
          await ctx.replyWithPhoto(ware.picture, {
            caption: ware.name,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `☀️ ${ware.price}₽`,
                    callback_data: JSON.stringify({
                      action: MenuActions.SHOW_WARE,
                      wareId: ware.id,
                    } as ShowWare),
                  },
                ],
                [
                  {
                    text: '⬅️',
                    callback_data: JSON.stringify({
                      action: MenuActions.SHOW_MAIN,
                    } as ShowMain),
                  },
                  {
                    text: '🛒',
                    callback_data: JSON.stringify({
                      action: MenuActions.SHOW_CART,
                    } as ShowCart),
                  },
                  {
                    text: '❤️',
                    callback_data: JSON.stringify({
                      action: MenuActions.SHOW_FAVORITE,
                    } as ShowFavorite),
                  },
                  {
                    text: '➡️',
                    callback_data: JSON.stringify({
                      action: MenuActions.SHOW_MAIN,
                    } as ShowMain),
                  },
                ],
              ],
            },
          });
        },
      );

      next();
    });
  };
}
