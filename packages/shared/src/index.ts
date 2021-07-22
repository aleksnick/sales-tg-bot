import parser from 'fast-xml-parser';
import fs from 'fs';

import { ITildaYML, TTildaData } from './@types/formats/tildaYML';

export const getDataFromTildaYML = (): TTildaData => {
  const file = fs.readFileSync('../../files/example.yml');
  const data = parser.parse(file.toString(), {
    attributeNamePrefix: '',
    textNodeName: 'value',
    ignoreAttributes: false,
    parseAttributeValue: true,
    allowBooleanAttributes: true,
  }) as ITildaYML;
  return data.yml_catalog.shop;
};

export const getDataFromCSV = (): {} => ({});
