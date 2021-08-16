import { MenuTemplate } from 'telegraf-inline-menu';
import { Category } from 'shared-types';
import { Context } from 'src/@types/Context';
// import { MenuStates } from 'src/@types/MenuState';
// import createCatalogMenu from '../Catalog';
import categoriesToSelect from '../../utils/categoriesToSelect';

interface Options {
  categories: Category[];
}

const createMainMenu = ({ categories }: Options) => {
  const menu = new MenuTemplate<Context>((ctx) => `Hey ${ctx.from?.first_name}!`);

  let selectedKey = 'b';
  menu.select('select', categoriesToSelect(categories), {
    set: async (ctx, key) => {
      selectedKey = key;
      await ctx.answerCbQuery(`you selected ${key}`);
      return true;
    },
    isSet: (__, key) => key === selectedKey,
    columns: 2,
  });

  return menu;
};

export default createMainMenu;
