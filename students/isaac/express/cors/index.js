
const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Methods', '*');
  //res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(3000, () => {
  console.log('running');
});

module.exports = app;
