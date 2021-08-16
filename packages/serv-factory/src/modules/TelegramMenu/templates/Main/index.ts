import { MenuTemplate } from 'telegraf-inline-menu';
import { Context } from 'src/@types/Context';
import { MenuStates } from 'src/@types/MenuState';
import createCatalogMenu from '../Catalog';

const createMainMenu = () => {
  const menu = new MenuTemplate<Context>((ctx) => `Hey ${ctx.from?.first_name}!`);

  const subMenu = createCatalogMenu();

  const choices: Record<string, string> = {
    a: 'Alphabet',
    b: 'Beta',
    c: 'Canada',
  };

  let state = 'INIT';
  let toogle = false;

  menu.toggle('toggle me', 'toggle me', {
    // hide: () => state !== 'INIT',
    set: (_ctx, newState) => {
      _ctx.menuState = MenuStates.CATALOG;
      // _ctx.update({
      //   menuState: MenuStates.CATALOG,
      // });
      state = 'CHOOSE';
      toogle = newState;
      // Update the menu afterwards
      return 'food';
    },
    isSet: () => toogle,
  });

  menu.choose('I am excited!', choices, {
    hide: (ctx) => ctx.menuState !== MenuStates.CATALOG,
    do: async (ctx, key) => {
      await ctx.answerCbQuery(`Lets ${key}`);
      state = 'SELECT';
      return true;
    },
    buttonText: (_context, text) => text.toUpperCase(),
  });

  let selectedKey = 'b';
  menu.select('select', ['A1', 'B2', 'C3'], {
    set: async (ctx, key) => {
      selectedKey = key;
      await ctx.answerCbQuery(`you selected ${key}`);
      return true;
    },
    isSet: (_, key) => key === selectedKey,
  });

  menu.chooseIntoSubmenu('unique', ['Gotham', 'Mos Eisley', 'Springfield'], subMenu);
  console.log(state);

  return menu;
};

export default createMainMenu;
