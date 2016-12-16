const express = require('express');

const app = express();

//con get defines la ruta
// send tambien termina la comexion
 app.get('/', (req, res) => {
   res.send('Hello World!');
 });

app.listen(3000, () => {
  console.log("runing on 3000");
})

module.exports = app;
