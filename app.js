const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello from the server side!', app: 'Tours' });
});

app.post('/', (req, res) => {
  res.send('Posting!!');
});

const port = 3000;
app.listen(port, () => {
  console.log('App running!');
});
