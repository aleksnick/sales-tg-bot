export enum MenuStates {
  CATALOG = 'CATALOG',
  WARE = 'WARE',
  PARAM = 'PARAM',
}

export type MenuState =
  | MenuStates.CATALOG
  | MenuStates.WARE
  | MenuStates.PARAM;
