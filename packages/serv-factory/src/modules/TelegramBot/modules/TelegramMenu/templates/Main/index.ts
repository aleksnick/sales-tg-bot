import _ from 'lodash';
import {
  Category, CategoryId, Ware, WareId,
} from 'shared-types';
import { MenuState } from 'src/@types/MenuState';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import findWares from '../../utils/findWares';

const PREVIEW_LIMIT_IN_CATEGORY = 3;

interface ShowCategory {
  action: 'SHOW_CATEGORY';
  categoryId: CategoryId;
}

interface ShowWare {
  action: 'SHOW_WARE';
  wareId: WareId;
}

interface MainMenuOptions {
  categories: Category[];
  wares: Ware[];
  state: MenuState,
  onChangeState: (state: MenuState) => void;
}

const createMainMenu = (bot: TelegramBotWorker, { categories, wares }: MainMenuOptions) => {
  const categoryKeyboard = categories.map((category) => ({
    text: category.value,
    callback_data: JSON.stringify({
      action: 'SHOW_CATEGORY',
      categoryId: category.id,
    }),
  }));

  bot.command('go', async (ctx, next) => {
    await ctx.reply('выберите категорию',
      {
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
    console.log('>>> action', categoryId, wares[0]);

    _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach(async (ware) => {
      await ctx.replyWithPhoto(ware.picture,
        {
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
    });

    next();
  });

  bot.action(/action/, async (ctx, next) => {
    let wareId: WareId;

    try {
      const data = JSON.parse(ctx.match.input) as ShowWare;

      if (data.action !== 'SHOW_WARE') {
        throw new Error('not a SHOW_WARE');
      }

      wareId = data.wareId;
    } catch {
      next();
      return;
    }

    const ware = wares.find((w) => w.id === wareId);

    if (!ware) {
      next();
      return;
    }

    await ctx.replyWithPhoto(ware.picture);

    await ctx.reply(ware.description,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `${ware.price}₽`,
                callback_data: JSON.stringify({
                  action: 'ADD_TO_CART',
                  wareId: ware.id,
                }),
              },
            ],
          ],
        },
      });

    next();
  });
};

export default createMainMenu;
