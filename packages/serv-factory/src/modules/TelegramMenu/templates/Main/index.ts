import { MenuTemplate, replyMenuToContext } from 'telegraf-inline-menu';
import _ from 'lodash';
import { Category, Ware } from 'shared-types';
import { Context } from 'src/@types/Context';
import { MenuState } from 'src/@types/MenuState';
import loadPhoto from '../../utils/loadPhoto';

interface MainMenuOptions {
  categories: Category[];
  wares: Ware[];
  state: MenuState,
  onChangeState: (state: MenuState) => void;
}

let hide = true;

const createMainMenu = ({ categories, wares }: MainMenuOptions) => {
  const menu = new MenuTemplate<Context>(() => 'выберите категорию');

  categories.forEach((category) => {
    const subMenu = new MenuTemplate<Context>(() => category.value);

    menu.submenu(category.value, `category-${category.id}`, subMenu, {
      joinLastRow: true,
      hide: () => hide,
    });

    menu.toggle(category.value, `link-${category.id}`, {
      set: async (ctx) => {
        hide = false;

        _.take(wares, 3).forEach(async (ware) => {
          const wareMenu = new MenuTemplate<Context>(async () => {
            const photo = await loadPhoto(ware.picture);

            return {
              type: 'photo',
              media: {
                source: photo,
              },
              text: ware.name,
              parse_mode: 'Markdown',
            };
          });

          wareMenu.interact('Buy', `link-${ware.id}`, {
            do: () => {
              console.log('>>> click');

              return true;
            },
          });

          await replyMenuToContext(wareMenu, ctx, `/ware-${ware.id}/`);
        });

        return `/category-${category.id}/`;
      },
      isSet: () => true,
    });
  });

  return menu;
};

export default createMainMenu;
