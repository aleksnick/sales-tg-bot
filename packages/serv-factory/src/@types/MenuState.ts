export enum MenuStates {
  MAIN = 'MAIN',
  CATALOG = 'CATALOG',
  WARE = 'WARE',
  PARAM = 'PARAM',
}

export type MenuState =
  | MenuStates.MAIN
  | MenuStates.CATALOG
  | MenuStates.WARE
  | MenuStates.PARAM;
