import { Injectable } from '@nestjs/common';
import { Ware, WareId } from 'shared-types';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import {
  MenuActions,
  ShowCategory,
  ShowWare,
  AddToCart,
  AddToFavorite,
} from '../../@types/Actions';

interface WareMenuOptions {
  wares: Ware[];
}

@Injectable()
export class TelegramWareMenuService {
  createMenu = (bot: TelegramBotWorker, { wares }: WareMenuOptions) => {
    bot.action(/action/, async (ctx, next) => {
      let wareId: WareId;

      try {
        const data = JSON.parse(ctx.match.input) as ShowWare;

        if (data.action !== MenuActions.SHOW_WARE) {
          throw new Error(`not a ${MenuActions.SHOW_WARE}`);
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

      await ctx.reply(ware.name);

      const sizesMenu = [
        {
          text: '✅ S',
          callback_data: JSON.stringify({}),
        },
        {
          text: 'M',
          callback_data: JSON.stringify({}),
        },
        {
          text: 'L',
          callback_data: JSON.stringify({}),
        },
      ];

      await ctx.replyWithPhoto(ware.picture, {
        caption: ware.description,
        reply_markup: {
          inline_keyboard: [
            sizesMenu,
            [
              {
                text: `🛍 ${ware.price}₽`,
                callback_data: JSON.stringify({
                  action: MenuActions.ADD_TO_CART,
                  wareId: ware.id,
                } as AddToCart),
              },
              {
                text: '❤️',
                callback_data: JSON.stringify({
                  action: MenuActions.ADD_TO_FAVORITE,
                  wareId: ware.id,
                } as AddToFavorite),
              },
            ],
            [
              {
                text: '⬅️ Назад',
                callback_data: JSON.stringify({
                  action: MenuActions.SHOW_CATEGORY,
                  categoryId: ware.categoryId,
                } as ShowCategory),
              },
            ],
          ],
        },
      });

      next();
    });

    bot.action(/action/, async (ctx, next) => {
      try {
        const data = JSON.parse(ctx.match.input) as AddToCart;

        if (data.action !== MenuActions.ADD_TO_CART) {
          throw new Error(`not a ${MenuActions.ADD_TO_CART}`);
        }
      } catch {
        next();

        return;
      }

      await ctx.answerCbQuery('Товар добавлен в корзину');

      next();
    });

    bot.action(/action/, async (ctx, next) => {
      try {
        const data = JSON.parse(ctx.match.input) as AddToFavorite;

        if (data.action !== MenuActions.ADD_TO_FAVORITE) {
          throw new Error(`not a ${MenuActions.ADD_TO_FAVORITE}`);
        }
      } catch {
        next();

        return;
      }

      await ctx.answerCbQuery('Товар добавлен в избранное');

      next();
    });
  };
}
