const express = require('express'),
      db = require('../db'),
      service = require('../service');

// [prefix] /auth/
const authRoutes = express.Router();

// POST
authRoutes.post('/', (req, res) => {
  let userData = {};
  //console.log(`POST /auht`, '\n[body]->\n', req.body);

  try {
    userData.id = getProperty(req, 'id');
    userData.name = getProperty(req, 'name');
    userData.password = getProperty(req, 'password');
    userData.email = getProperty(req, 'email');

    db.users.findById(userData.id, (err, userDB) => {
      if (err) {
        return res.sendStatus(400);
      }
      //console.log('[response]->', userDB);

      if (!userDB || userDB.password !== userData.password) {
        res.sendStatus(400);
      }

      res.status(201).json({
        "auth-token": service.createToken(userDB)
      });
    });
  } catch(e) {
    //console.error(e);
    return res.sendStatus(400);
  }
});

// Helper functions
function getProperty(req, prop) {
  if(req.body[prop]){
    return req.body[prop];
  }
  throw new Error(`Property "${prop} is not defined."`);
}

module.exports = authRoutes;
