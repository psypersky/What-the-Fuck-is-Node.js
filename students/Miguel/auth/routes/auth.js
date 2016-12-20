"use strict";

const express = require('express');
const usersDB = require('./user').usersDB;
const service = require('../token/service');
const router = express.Router();

router.post('', (req, res) => {
  const flag = usersDB.findIndex((elem) => {
    return elem.email === req.body.email &&
           elem.password === req.body.password;
  });
  if (flag >= 0) {
    res.status(201).json({
      'success': true,
      'message': 'Enjoy your token!',
      'auth-token': service.createToken(usersDB[flag])
    });
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

module.exports = router;
