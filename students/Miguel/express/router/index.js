const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const app = express();

app.use(bodyParser.json());

app.use('/user', user);

app.listen(3030, () => {
  console.log("Listening in port 3030");
});

module.exports = app;
