const express = require('express'),
      db = require('../db');

// prefix -> /user
const user = express.Router();

user.post('/', (req, res) => {
  //console.log('[req body]', req.body);
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  db.insertUser(newUser, (user) => {
    //console.log('[user inserted]', user);
    res.status(201).json(user);
  });
});

user.get('/:id', (req, res) => {
  //console.log('[params]', req.params);
  let userId = parseInt(req.params.id);

  db.findUserBy('id', userId, (user) => {
    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).json(user);
  });
});

user.put('/:id', (req, res) => {
  //console.log('[req body]', req.body);
  //console.log('[params]', req.params);
  let userID = parseInt(req.params.id);
  let newData = req.body;

  db.updateUser(userID, newData, (err, userUpdated) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.status(200).json(userUpdated);
  });
});

user.delete('/:id', (req, res) => {
  //console.log('[params]', req.params);
  let userID = parseInt(req.params.id);

  db.deleteUser(userID, (err) => {
    if (err) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
});

module.exports = user;
