import { Category } from 'shared-types';

const categoriesToSelect = (categories: Category[]) => categories.reduce((res, { value, id }) => {
  res[id] = value;
  return res;
}, {} as Record<string, string>);

export default categoriesToSelect;
