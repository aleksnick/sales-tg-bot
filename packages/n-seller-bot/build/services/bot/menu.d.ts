import { Context } from 'telegraf';
import { MenuMiddleware } from 'telegraf-inline-menu';
declare const createMenuMiddleware: () => MenuMiddleware<Context<import("typegram").Update>>;
export default createMenuMiddleware;
