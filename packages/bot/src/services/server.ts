import express from 'express';
import { DEFAULT_PORT } from 'config';

const expressApp = express();

const port = process.env.PORT || DEFAULT_PORT;

expressApp.get('/', (_req, res) => {
  res.send('Hello World!');
});

expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
