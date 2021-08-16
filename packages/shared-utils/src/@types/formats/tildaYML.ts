import { Currency, Category, Ware } from 'shared-types';

export interface TildaYML {
  yml_catalog: {
    shop: {
      name: string;
      company: string;
      url: string;
      platform: string;
      version: number;
      currencies: {
        currency: Currency;
      }
      categories: {
        category: Category[];
      }
      offers: {
        offer: Ware[]
      }
    }
  }
}

export type TildaData = TildaYML['yml_catalog']['shop'];
