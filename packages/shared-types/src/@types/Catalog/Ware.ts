import { Param } from './Param';

export interface Ware {
  id: number;
  group_id: number;
  name: string;
  vendor: string;
  description: string;
  picture: string;
  url: string;
  price: string;
  currencyId: string;
  categoryId: string;
  param: Param[];
}
