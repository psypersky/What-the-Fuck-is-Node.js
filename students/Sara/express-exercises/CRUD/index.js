"use strict";

const querystring = require('querystring');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = [];

app.get('/', function (req, res) {
 res.sendStatus(200);
});

app.post('/user', function (req, res) {
  let nuevo = req.body;
  nuevo.id = Math.round(Math.random()*1000000000);
  // console.log(nuevo.id);
  db.push(req.body);
  res.status(201).json(req.body);
});

app.post('/auth', function (req, res) {
  let user = req.body;
  let match = db.find(function (current) {
    return current.name === user.name && current.email === user.email;
  });
  if(match) {
    res.status(200).json(match);
  }
});

app.get('/user/:id', function (req, res) {
  let user = req.url.split("/");
  let object =
      {
        id: user[2]
      };
  // console.log(object);
  //  console.log(user);
  let match = db.find( function (current) {
    return current.id.toString() === object.id;
    });
  // console.log(match);
  if(match) {
    res.status(200).json(match);
  }
  else {
    res.status(404).json();
  }
});

app.delete('/user/:id', function (req, res) {
  let user = req.url.split("/");
  let object =
      {
        id: user[2]
      };
  let match = false;
  for (let i = 0; i < db.length; i++) {
    // console.log(typeof db[i].id);
    // console.log(typeof object.id);
    if(db[i].id.toString() === object.id) {
      match = true;
      db.splice(i, 1);
    }
  }
  if(match) {
    res.status(200).json(match);
  }
});

app.put('/user/:id', function (req, res) {
  let user = req.url.split("/");
  let object =
    {
      id: user[2]
    };
  let match = db.find( function (current) {
    // console.log(typeof current.id);
    // console.log(typeof object.id);
    if(current.id.toString() === object.id) {
      current.name = req.body.name;
      return current;
    }
  });
  if(match) {
    res.status(200).json(match);
  }
});

app.listen(3000, function () {
  console.log("Running on port 3000.");
});

module.exports = app;
