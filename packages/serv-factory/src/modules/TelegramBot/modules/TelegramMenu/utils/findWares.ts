import _ from 'lodash';
import { Category, Ware } from 'shared-types';

const findWares = (wares: Ware[], category: Category) => {
  const res = _.filter(wares, (ware) => ware.categoryId.toString() === category.id.toString());

  return res;
};

export default findWares;
