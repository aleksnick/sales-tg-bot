import { Injectable } from '@nestjs/common';
// import _ from 'lodash';
import { getDataFromTildaYML } from 'shared-utils';

@Injectable()
export class CatalogService {
  getCategories = () => {
    const categories = getDataFromTildaYML().categories.category;

    return categories;
  };

  getWares = () => {
    const offers = getDataFromTildaYML().offers.offer;

    return offers;
  };
}
