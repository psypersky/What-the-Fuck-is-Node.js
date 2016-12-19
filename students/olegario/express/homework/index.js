'use strict'

const express = require('express');

const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.json());

const database = [];
var user;

app.post('/user', (req, res) => {
  req.body.id = database.length > 0 ? database[database.length - 1].id + 1 : 1;
  var position = database.push(req.body);
  res.status(201).json(database[position-1]);
});

app.post('/auth', (req, res) => {
  if (exist(req.body)) {
    res.status(200).end();
  } else {
    res.status(400).json({error: 'pelas'});
  }
});

app.get('/user/:id', (req, res) => {
  user = existID(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({error: 'pelas'});
  }
});

app.put('/user/:id', (req, res) => {
  user = search(req.params.id);
  if (user >= 0) {
    var keys = Object.keys(req.body);
    keys.forEach(function (element) {
      database[user][element] = req.body[element];
    });
    res.status(200).json(database[user]);
  } else {
    res.status(400).json({error: 'pelas'});
  }
});

app.delete('/user/:id', (req, res) => {
  user = search(req.params.id);
  if (user >= 0) {
    database.splice(user, 1)
    res.status(200).end();
  } else {
    res.status(400).json({error: 'pelas'});
  }
});

app.listen(3000, () => {
  console.log('runing');
});

function exist(user) {
  return database.find(function (element) {
    if (user.name === element.name && user.password === element.password) {
      return true;
    }
  });
}

function existID(id) {
  return database.find(function (element) {
    if (+id === element.id){
      return true;
    }
  });
}

function search(id) {
  return database.findIndex(function (element) {
    if (+id == element.id) {
      return true;
    }
  });
}

module.exports = app;
