import { CategoryId } from './Category';
import { CurrencyId } from './Currency';
import { Param } from './Param';

export type WareId = number;

export interface Ware {
  id: WareId;
  group_id: number;
  name: string;
  vendor: string;
  description: string;
  picture: string;
  url: string;
  price: string;
  currencyId: CurrencyId;
  categoryId: CategoryId;
  param: Param[];
}
