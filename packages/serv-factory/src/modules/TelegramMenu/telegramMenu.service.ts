import { Injectable } from '@nestjs/common';
import { MenuFactory } from 'telegraf-ctx-menu';
import { Context } from 'src/@types/Context';
import { TelegramBotWorker } from 'src/@types/TelegramBotWorker';
// import { CatalogService } from 'src/modules/Catalog/catalog.service';
// import { MenuStates } from 'src/@types/MenuState';

@Injectable()
export class TelegramMenuService {
  // private state: MenuState = MenuStates.MAIN;

  // constructor(private readonly catalogService: CatalogService) {}

  registr = (bot: TelegramBotWorker) => {
    const menuFactory = new MenuFactory<Context>();

    const subMenu2 = menuFactory.menu({
      command: 'sub2',
      parseMode: 'MarkdownV2',
      description: 'View your available items 2',
      dialogFunction: () => 'qwerty 2',
      buttons: [
        {
          label: 'Go 2',
          action: (ctx) => {
            ctx.answerCbQuery();
          },
        },
      ],
    });

    const subMenu = menuFactory.menu({
      command: 'sub',
      parseMode: 'MarkdownV2',
      description: 'View your available items 1',
      dialogFunction: () => 'qwerty',
      buttons: [
        {
          label: 'Go',
          action: (ctx) => {
            ctx.answerCbQuery();
            subMenu2.send(ctx);
            return {
              markup: 2,
            };
          },
        },
      ],
    });

    const itemsMenu = menuFactory.menu({
      command: 'start',
      parseMode: 'MarkdownV2',
      description: 'View your available items',
      dialogFunction: () => 'Hello, here is where you select your items',
      buttons: [
        [
          {
            label: 'Add item',
            action: (ctx) => {
              ctx.answerCbQuery();
              ctx.reply('You have added an item');
            },
          },
          {
            label: 'Remove item',
            action: (ctx) => {
              ctx.answerCbQuery();
            },
            promptAction: (ctx) => {
              console.log('ctx', ctx);
            },
          },
        ],
        [
          {
            label: 'Cancel',
            action: (ctx) => {
              ctx.answerCbQuery();
              subMenu.send(ctx);
              // ctx.state.newSubmenu
              // return {
              //   markup: 2,
              // };
            },
          },
        ],
      ],
    });

    itemsMenu.register(bot);
    subMenu.register(bot);
    subMenu2.register(bot);
  };

  // changeState = (newState: MenuStates) => {
  //   this.state = newState;
  // };
}
