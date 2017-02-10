"use strict";

const express = require('express');
const saltHashPassword = require('../modules/encrypt');
const router = express.Router();

const usersDB = [];

router.post('', (req, res) => {
  let user = {}
  user.id = usersDB.length + 1;
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = saltHashPassword(req.body.password);
  usersDB.push(user);
  res.status(201).json(usersDB[usersDB.length - 1]);
});

router.get('/:id', (req, res) => {
  let flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (req.headers['auth-token']) {
    if (flag >= 0) {
      res.status(200).json(usersDB[flag]);
    } else {
      res.status(404).json({error: 'Dx'});
    }
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

router.put('/:id', (req, res) => {
  let flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (flag >= 0 && req.body.name) {
    usersDB[flag].name = req.body.name;
    res.status(200).json(usersDB[+req.params.id - 1]);
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

router.delete('/:id', (req, res) => {
  let flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (flag >= 0) {
    usersDB.splice(flag, 1);
    res.status(200).end();
  } else {
    res.status(404).json({error: 'Dx'});
  }
})

module.exports = {
  router: router,
  usersDB: usersDB
};
