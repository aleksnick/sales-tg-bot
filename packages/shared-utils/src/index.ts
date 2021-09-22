import parser from 'fast-xml-parser';
import fs from 'fs';
import { TildaYML, TildaData } from './@types/formats/tildaYML';

export { default as findWaresByCategoryId } from './utils/findWares';

export const getDataFromTildaYML = (): TildaData => {
  const file = fs.readFileSync('../../files/example.yml');
  const data = parser.parse(file.toString(), {
    attributeNamePrefix: '',
    textNodeName: 'value',
    ignoreAttributes: false,
    parseAttributeValue: true,
    allowBooleanAttributes: true,
  }) as TildaYML;
  return data.yml_catalog.shop;
};

export const getDataFromCSV = (): {} => ({});
