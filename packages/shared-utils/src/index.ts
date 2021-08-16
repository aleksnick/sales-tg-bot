import parser from 'fast-xml-parser';
import fs from 'fs';
import {
  TildaYML, TildaData, Ware, Category,
} from './@types/formats/tildaYML';

export { Ware, Category };

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
