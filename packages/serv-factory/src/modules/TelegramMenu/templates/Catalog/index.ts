import { MenuTemplate } from 'telegraf-inline-menu';
import { Context } from 'src/@types/Context';
import l18n from 'src/l18n';

const createCatalogMenu = () => {
  const menu = new MenuTemplate<Context>(() => l18n('OPEN_CATALOG'));

  return menu;
};

export default createCatalogMenu;
