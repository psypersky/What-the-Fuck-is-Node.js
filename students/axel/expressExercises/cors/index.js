const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header("access-controll-allow-origin", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log("runing on 3000");
})

module.exports = app;