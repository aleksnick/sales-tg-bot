export interface Param {
  name: string;
  value: string;
}

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

export interface Currency {
  id: string;
  rate: number;
}

export interface Category {
  id: number;
  value: string;
}

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
