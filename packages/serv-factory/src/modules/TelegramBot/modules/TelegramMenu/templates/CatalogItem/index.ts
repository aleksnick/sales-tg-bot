import { MenuTemplate } from 'lib-telegraf-inline-menu';
import { Context } from 'src/@types/Context';
import { MenuStates } from 'src/@types/MenuState';

interface CatalogItemMenuOptions {
  id: number;
  title: string;
}

const createCatalogItemMenu = ({ id, title }: CatalogItemMenuOptions) => {
  const menu = new MenuTemplate<Context>(() => title);

  let check = true;

  menu.toggle(`${id}`, `${id}`, {
    set: async (ctx, newState) => {
      ctx.menuState = MenuStates.CATALOG;
      await ctx.reply('As am I!');
      check = newState;

      return false;
    },
    isSet: () => check,
  });

  return menu;
};

export default createCatalogItemMenu;
