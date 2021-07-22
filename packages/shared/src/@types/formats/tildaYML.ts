interface IParam {
  name: string;
  value: string;
}

interface IWare {
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
  param: IParam[];
}

interface ICurrency {
  id: string;
  rate: number;
}

interface ICategory {
  id: number;
  value: string;
}

export interface ITildaYML {
  yml_catalog: {
    shop: {
      name: string;
      company: string;
      url: string;
      platform: string;
      version: number;
      currencies: {
        currency: ICurrency;
      }
      categories: {
        category: ICategory[];
      }
      offers: {
        offer: IWare[]
      }
    }
  }
}

export type TTildaData = ITildaYML['yml_catalog']['shop'];
