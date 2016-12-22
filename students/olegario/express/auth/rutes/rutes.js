const express = require('express');
const middleware = require('../middleware/middleware');
const crypto = require('../encrypt/encrypt');

const route = express.Router();

const database = [];

route.post('', (req, res) => {
  req.body.id       = database.length > 0 ? database[database.length - 1].id + 1 : 1;
  req.body.password = crypto(req.body.password);
  var position      = database.push(req.body);
  res.status(201).json(database[position-1]);
});

route.get('/:id', middleware.ensureAuthenticated,(req, res) => {
  if (exist(req.user)) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({error: 'pelas'});
  }
});

route.put('/:id', (req, res) => {
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

route.delete('/:id', middleware.ensureAuthenticated, (req, res) => {
  user = search(req.params.id);
  if (user >= 0) {
    database.splice(user, 1)
    res.status(200).end();
  } else {
    res.status(400).json({error: 'pelas'});
  }
});

module.exports = {
  route    : route,
  database : database
};

function exist (user) {
 return database.find(function (element) {
   var password = user.password ? crypto(user.password) : false;
   if (user.name === element.name && (password === element.password || user.email === element.email)) {
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
