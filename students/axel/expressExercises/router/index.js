const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/user');
app.use(bodyParser.json());
//con get defines la ruta
// send tambien termina la comexion

app.use('/user', user);

app.listen(3000, () => {
  console.log("runing on 3000");
})

module.exports = app;
