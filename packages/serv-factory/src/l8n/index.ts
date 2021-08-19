import ru from './locales/ru';

export type Keys = keyof typeof ru;

const l8n = (key: Keys): string => ru[key];

export default l8n;
