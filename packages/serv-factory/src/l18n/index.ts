import ru from './locales/ru';

export type Keys = keyof typeof ru;

const l18n = (key: Keys): string => ru[key];

export default l18n;
