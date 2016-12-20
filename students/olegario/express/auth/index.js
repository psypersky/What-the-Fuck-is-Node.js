'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const user = require('./rutes/rutes').route;
const auth = require('./rutes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/user', user);
app.use('/auth', auth);

app.listen(3000, () => {
  console.log('runing');
});

module.exports = app;
