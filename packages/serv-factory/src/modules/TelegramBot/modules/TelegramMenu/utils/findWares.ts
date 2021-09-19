import _ from 'lodash';
import { Ware, CategoryId } from 'shared-types';

const findWares = (wares: Ware[], categoryId: CategoryId) => {
  const res = _.filter(wares, (ware) => ware.categoryId === categoryId);

  return res;
};

export default findWares;
