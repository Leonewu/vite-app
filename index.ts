
import * as express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.type('html');
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(80, () => {});