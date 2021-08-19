import https from 'https';

const getPhoto = (href: string) => new Promise((resolve) => {
  https.get(href, (res) => {
    const data: Buffer[] = [];

    res.on('data', (chunk: Buffer) => {
      data.push(chunk);
    }).on('end', () => {
      const buffer = Buffer.concat(data);

      resolve(buffer);
    });
  });
});

export default getPhoto;
