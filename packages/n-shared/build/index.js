import parser from 'fast-xml-parser';
import fs from 'fs';

const getData = () => {
    const file = fs.readFileSync('../../files/example.yml');
    const data = parser.parse(file.toString());
    return data['yml_catalog'];
};

export { getData };
