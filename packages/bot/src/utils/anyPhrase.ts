import _ from 'lodash';

const anyPhrase: (phrases: string[]) => string = _.flow(_.shuffle, _.head);

export default anyPhrase;
