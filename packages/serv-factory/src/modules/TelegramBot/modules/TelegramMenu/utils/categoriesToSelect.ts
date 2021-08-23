import { Category } from 'shared-types';

let key = 0;

const categoriesToSelect = (categories: Category[]) => categories.reduce((res, { value, id }) => {
  key += 1;
  res[id] = `${value}-${key}`;
  return res;
}, {} as Record<string, string>);

export default categoriesToSelect;
