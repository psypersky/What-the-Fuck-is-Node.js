const express = require('express'),
      bodyParser = require('body-parser'),
      routes = require('./routes/');


const app = express();

app.use(bodyParser.json());

app.use('/user', routes.user);
app.use('/auth', routes.auth);

app.listen(8000, () => console.log(`listening on port 8000`));

module.exports = app;
