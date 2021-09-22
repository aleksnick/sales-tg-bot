import { CategoryId, WareId } from 'shared-types';

export enum MenuActions {
  SHOW_MAIN = 'SHOW_MAIN',
  SHOW_CATEGORY = 'SHOW_CATEGORY',
  SHOW_WARE = 'SHOW_WARE',
  SHOW_CART = 'SHOW_CART',
  SHOW_FAVORITE = 'SHOW_FAVORITE',
  ADD_TO_CART = 'ADD_TO_CART',
  ADD_TO_FAVORITE = 'ADD_TO_FAVORITE',
}

export interface ShowCategory {
  action: MenuActions.SHOW_CATEGORY;
  categoryId: CategoryId;
}

export interface ShowWare {
  action: MenuActions.SHOW_WARE;
  wareId: WareId;
}

export interface ShowMain {
  action: MenuActions.SHOW_MAIN;
}

export interface ShowCart {
  action: MenuActions.SHOW_CART;
}

export interface ShowFavorite {
  action: MenuActions.SHOW_FAVORITE;
}

export interface AddToCart {
  action: MenuActions.ADD_TO_CART;
  wareId: WareId;
}

export interface AddToFavorite {
  action: MenuActions.ADD_TO_FAVORITE;
  wareId: WareId;
}
