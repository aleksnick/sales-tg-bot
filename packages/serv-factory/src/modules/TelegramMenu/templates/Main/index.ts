import { MenuTemplate, replyMenuToContext } from 'telegraf-inline-menu';
import _ from 'lodash';
import { Category, Ware } from 'shared-types';
import { Context } from 'src/@types/Context';
import { MenuState } from 'src/@types/MenuState';
import loadPhoto from '../../utils/loadPhoto';
import findWares from '../../utils/findWares';

const PREVIEW_LIMIT_IN_CATEGORY = 3;

interface MainMenuOptions {
  categories: Category[];
  wares: Ware[];
  state: MenuState,
  onChangeState: (state: MenuState) => void;
}

// let hide = true;

const createMainMenu = ({ categories, wares }: MainMenuOptions) => {
  const createWareMenu = (ware: Ware) => {
    const wareMenu = new MenuTemplate<Context>(async () => {
      const photo = await loadPhoto(ware.picture);

      return {
        type: 'photo',
        media: {
          source: photo,
        },
        text: ware.description,
        parse_mode: 'Markdown',
      };
    });

    return wareMenu;
  };

  const createWarePreviewMenu = (ware: Ware, category: Category) => {
    const warePreviewMenu = new MenuTemplate<Context>(async () => {
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

    const wareMenu = createWareMenu(ware);

    warePreviewMenu.submenu(ware.name, 'offer', wareMenu, {
      hide: () => false,
    });

    warePreviewMenu.toggle(`${ware.price}₽`, 'link', {
      set: async () => {
        console.log('>>> click warePreviewMenu', `/category-${category.id}/ware-${ware.id}/offer/`);
        // const wareOfferMenu = createWareMenu(ware);
        // await replyMenuToContext(wareOfferMenu, ctx,
        // `/category-${category.id}/ware-${ware.id}/offer/`);

        return true;
      },
      isSet: () => true,
    });

    return warePreviewMenu;
  };

  console.log(createWareMenu);

  const menu = new MenuTemplate<Context>(() => 'выберите категорию');

  categories.forEach((category) => {
    const categoryMenu = new MenuTemplate<Context>(() => category.value);
    const waresInCategory = findWares(wares, category);

    waresInCategory.forEach((ware) => {
      const warePreviewMenu = createWarePreviewMenu(ware, category);

      categoryMenu.submenu(ware.name, `ware-${ware.id}`, warePreviewMenu, {
        hide: () => false,
      });
    });

    menu.submenu(category.value, `category-${category.id}`, categoryMenu, {
      hide: () => true,
    });

    menu.toggle(category.value, `link-${category.id}`, {
      set: async (ctx) => {
        // hide = false;

        _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach(async (ware) => {
          const warePreviewMenu = createWarePreviewMenu(ware, category);
          console.log('>>> click category', `/category-${category.id}/ware-${ware.id}/`);

          await replyMenuToContext(warePreviewMenu, ctx, `/category-${category.id}/ware-${ware.id}/`);
        });

        return true;
      },
      isSet: () => true,
    });
  });

  return menu;
};

export default createMainMenu;
