import { MenuTemplate } from 'telegraf-inline-menu';
import { Context } from 'src/@types/Context';
import l18n from 'src/l18n';

const createCatalogMenu = () => {
  const menu = new MenuTemplate<Context>(() => l18n('OPEN_CATALOG'));

  menu.interact('I am excited!', 'a', {
    do: async (ctx) => {
      await ctx.reply('As am I!');
      return '/settings/';
    },
  });

  return menu;
};

export default createCatalogMenu;
