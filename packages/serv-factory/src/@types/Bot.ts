export interface BotOptions {
  id: string;
  token: string;
}

export interface Bot {
  start: () => Promise<void>;
}
