export enum BotChannels {
  TELEGRAM = 'TELEGRAM',
}

export type BotChannel = keyof typeof BotChannels;

export enum BotTypes {
  SHOP = 'SHOP',
}

export type BotType = keyof typeof BotTypes;
