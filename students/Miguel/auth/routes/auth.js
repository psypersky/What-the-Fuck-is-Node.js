"use strict";

const express = require('express');
const usersDB = require('./user').usersDB;
const saltHashPassword = require('../modules/encrypt');
const service = require('../token/service');
const router = express.Router();

router.post('', (req, res) => {
  let userToken = {};
  const flag = usersDB.findIndex((elem) => {
    return elem.email === req.body.email &&
           elem.password === saltHashPassword(req.body.password);
  });
  if (flag >= 0) {
    userToken.name = usersDB[flag].name;
    userToken.email = usersDB[flag].email;
    res.status(201).json({
      'success': true,
      'message': 'Enjoy your token!',
      'auth-token': service.createToken(userToken)
    });
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

module.exports = router;
