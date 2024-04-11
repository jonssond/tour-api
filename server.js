const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected!');
});

const port = 3000;
app.listen(port, () => {
  console.log('App running!');
});
