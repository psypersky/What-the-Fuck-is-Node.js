const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const user = require('./routes/user');

app.use(bodyParser.json());

app.use('/user', user);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
