const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const user = {
  id: 1,
  name: 'axel'
};
//con get defines la ruta
// send tambien termina la comexion
app.get('/', (req, res) => {
 res.send('Hello World!');
});

app.all('/user*', (req, res, next) => {
  if (!req.headers['auth-token']) {
    res.status(400).json({error: 'pelas'});
  } else {
    next();
  }
});

app.get('/user/:id', (req, res) => {
 res.json(user);
});

app.post('/user', (req, res) => {
  req.body.id = 2;
  res.status(201).json(req.body);
});

app.put('/user/:id', (req, res) => {
  res.json(req.body);
});

app.delete('/user/:id', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("runing on 3000");
})

module.exports = app;
