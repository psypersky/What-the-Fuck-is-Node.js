"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user').router;
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/user', user);
app.use('/auth', auth);

module.exports = app;
