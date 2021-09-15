import { MenuTemplate } from 'lib-telegraf-inline-menu';
import _ from 'lodash';
import { Category, Ware } from 'shared-types';
import { Context } from 'src/@types/Context';
import { MenuState } from 'src/@types/MenuState';
import loadPhoto from '../../utils/loadPhoto';
import findWares from '../../utils/findWares';

const PREVIEW_LIMIT_IN_CATEGORY = 1;

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
        text: ware.name,
        parse_mode: 'Markdown',
      };
    });

    return wareMenu;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createWarePreviewMenu = (ware: Ware, _category: Category) => {
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

    // warePreviewMenu.manualAction(/offer/, (ctx) => {
    //   console.log('>>> action', ctx);

    //   return true;
    // });

    warePreviewMenu.submenu(`${ware.name} -> offer`, 'offer', wareMenu, {
      hide: () => false,
    });

    // warePreviewMenu.interact(`${ware.price}₽`, 'link', {
    //   do: async (ctx) => {
    //     await ctx.answerCbQuery(`/ware-${ware.id}/offer/`);

    //     console.log('>>> click warePreviewMenu', `/ware-${ware.id}/offer/`);
    //     // const wareOfferMenu = createWareMenu(ware);
    //     // await replyMenuToContext(wareOfferMenu, ctx,
    //     // `/category-${category.id}/ware-${ware.id}/offer/`);

    //     return true;
    //   },
    // });

    return warePreviewMenu;
  };

  const menu = new MenuTemplate<Context>(() => 'выберите категорию');

  categories.forEach((category) => {
    const categoryMenu = new MenuTemplate<Context>(() => category.value);
    const waresInCategory = findWares(wares, category);

    _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach((ware) => {
      const warePreviewMenu = createWarePreviewMenu(ware, category);

      // categoryMenu.renderBody(async () => {
      //   const photo = await loadPhoto(ware.picture);

      //   return {
      //     type: 'photo',
      //     media: {export
      //       source: photo,
      //     },
      //     text: ware.name,
      //     parse_mode: 'Markdown',
      //   };
      // });

      categoryMenu.submenu(ware.name, `ware-${ware.id}`, warePreviewMenu, {
        hide: () => false,
      });
    });

    menu.submenu(category.value, `category-${category.id}`, categoryMenu, {
      hide: () => false,
    });

    // menu.interact(category.value, `link-${category.id}`, {
    //   do: async (ctx) => {
    //     // hide = false;
    //     await ctx.answerCbQuery(`category-${category.id}`);

    //     _.take(waresInCategory, PREVIEW_LIMIT_IN_CATEGORY).forEach(async (ware) => {
    //       const warePreviewMenu = createWarePreviewMenu(ware, category);

    //       await replyMenuToContext(warePreviewMenu, ctx, `/ware-${ware.id}/`);
    //     });

    //     return true;
    //   },
    // });
  });

  // menu.manualAction(/category/, (ctx) => {
  //   console.log('>>> action', ctx);

  //   return true;
  // });

  return menu;
};

export default createMainMenu;
