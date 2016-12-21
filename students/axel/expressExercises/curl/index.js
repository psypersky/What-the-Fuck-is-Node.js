const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const app = express();
// const user = require('./routes/user');
app.use(bodyParser.json());
//con get defines la ruta
// send tambien termina la comexion

// app.use('/user', user);
const dataBase = [

];
var i = 0;

app.get('/axel', (req, res) => {
 res.sendStatus(200);
});

app.post('/user', (req, res) => {
  var newUser = req.body;
  var num = ++i;
  newUser.id = num.toString();
  dataBase.push(req.body);
  res.status(201).json(req.body);
});


app.post('/auth', (req, res) => {
  var user = req.body;
  var foundUser = dataBase.find((current) => { return current.name === user.name && current.email === user.email});
  // console.log(foundUser);
  if (foundUser) {
    res.status(200).json(foundUser);
  }
});

app.get('/user/:id', (req, res) => {
  var user = req.url.split("/");
  var obj = {id: user[2]};
  console.log(obj, dataBase);
  var foundUser = dataBase.find((current) => { return current.id === obj.id});
  // console.log(foundUser);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json();
  }
});

app.put('/user/:id', (req, res) => {
  var user = req.url.split("/");
  var obj = {id: user[2]};
  console.log(req.url, req.body);
  var foundUser = dataBase.find((current) => {
    if (current.id === obj.id) {
      current.name = req.body.name;
      return current;
    }
  });
  if (foundUser) {
    res.status(200).json(foundUser);
  }
});

app.del('/user/:id', (req, res) => {
  var user = req.url.split("/");
  var obj = {id: user[2]};
  console.log(req.url);
  var foundUser = false;
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].id === obj.id) {
      dataBase.splice(i, 1);
      foundUser = true;
    }
  }
  if (foundUser) {
    res.status(200).json(foundUser);
  }
});

app.listen(3000, () => {
  console.log("runing on 3000");
})

module.exports = app;
