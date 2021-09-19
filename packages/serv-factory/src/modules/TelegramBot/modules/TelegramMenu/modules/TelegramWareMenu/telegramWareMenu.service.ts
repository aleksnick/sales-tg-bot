import { Injectable } from '@nestjs/common';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
import { Ware, WareId } from 'shared-types';

interface ShowWare {
  action: 'SHOW_WARE';
  wareId: WareId;
}

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

      await ctx.reply(ware.name);

      await ctx.replyWithPhoto(ware.picture);

      await ctx.reply(ware.description, {
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
}
