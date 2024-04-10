const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connected!');
  });

const port = 3000;
app.listen(port, () => {
  console.log('App running!');
});
