import { RegistrMiddleWare } from 'src/@types/Middleware';
import phrases from './phrases';

const registrPhrasesMiddleware: RegistrMiddleWare = (bot) => {
  bot.on('text', async (ctx, next) => {
    const phrase = phrases.find((p) => p.regExp.some((r) => ctx.message.text.match(r)));
    if (phrase) {
      ctx.telegram.sendMessage(ctx.message.chat.id, phrase.res());
    }
    await next();
  });
};

export default registrPhrasesMiddleware;
