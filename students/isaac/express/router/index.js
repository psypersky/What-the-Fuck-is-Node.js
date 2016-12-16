const express = require('express');

const bodyParser = require('body-parser');

const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use('/user', user);


app.listen(3000, () => {
  console.log('running');
});


module.exports = app;
