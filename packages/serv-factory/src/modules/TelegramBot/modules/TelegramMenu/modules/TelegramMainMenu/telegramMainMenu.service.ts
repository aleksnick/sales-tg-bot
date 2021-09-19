import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { Category, CategoryId, Ware } from 'shared-types';

import findWares from '../../utils/findWares';

const PREVIEW_LIMIT_IN_CATEGORY = 3;

interface ShowCategory {
  action: 'SHOW_CATEGORY';
  categoryId: CategoryId;
}

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
    const categoryKeyboard = categories.map((category) => ({
      text: category.value,
      callback_data: JSON.stringify({
        action: 'SHOW_CATEGORY',
        categoryId: category.id,
      }),
    }));

    bot.command('go', async (ctx, next) => {
      await ctx.reply('выберите категорию', {
        reply_markup: {
          resize_keyboard: true,
          inline_keyboard: _.chunk(categoryKeyboard, 2),
        },
      });
      next();
    });

    bot.action(/action/, async (ctx, next) => {
      let categoryId: CategoryId;

      try {
        const data = JSON.parse(ctx.match.input) as ShowCategory;

        if (data.action !== 'SHOW_CATEGORY') {
          throw new Error('not a SHOW_CATEGORY');
        }

        categoryId = data.categoryId;
      } catch {
        next();
        return;
      }

      const waresInCategory = findWares(wares, categoryId);

      _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach(
        async (ware) => {
          await ctx.replyWithPhoto(ware.picture, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: ware.name,
                    callback_data: JSON.stringify({
                      action: 'SHOW_WARE',
                      wareId: ware.id,
                    }),
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
