interface IPhrase {
    regExp: RegExp[];
    res: () => string;
}
declare const phrases: IPhrase[];
export default phrases;
