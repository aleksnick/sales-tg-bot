import _ from 'lodash';
import { Ware, CategoryId } from 'shared-types';

const findWaresByCategoryId = (wares: Ware[], categoryId: CategoryId) => {
  const res = _.filter(wares, (ware) => ware.categoryId === categoryId);

  return res;
};

export default findWaresByCategoryId;
