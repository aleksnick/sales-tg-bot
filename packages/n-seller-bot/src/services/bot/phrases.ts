import anyPhrase from 'src/utils/anyPhrase';

interface IPhrase {
  regExp: RegExp[];
  res: () => string;
}

const phrases: IPhrase[] = [
  {
    regExp: [/привет/i, /здарова/i],
    res: () => anyPhrase(['Добрый день!', 'Привет!', 'Приветствую!', 'Здравсвуйте!']),
  },
  {
    regExp: [/как дела/i, /как сам/i],
    res: () => anyPhrase(['Замечательно!', 'Норм', 'Неплохо', 'Лучше всех', 'Супер!']),
  },
  {
    regExp: [/что делаешь/i, /чем занимаешься/i],
    res: () => anyPhrase([
      'работаю',
      'тружусь',
      'как всегда - работаю',
      'тружусь в поте лица',
    ]),
  },
];

export default phrases;
