const express = require('express'),
      db = require('../db'),
      middleware = require('../middleware');

// [prefix] /user/
const userRoutes = express.Router();

// GET
userRoutes.get('/:id', middleware.ensureAuthenticated, (req, res) => {
  let id = parseInt(req.params.id);
  //console.log(`GET /user/${id}`);

  db.users.findById(id, (err, data) => {
    if (err) {
      //console.error(err);
      return res.sendStatus(404);
    }
    //console.log('[response]->', data);
    res.status(200).json(data);
  });
});

// POST
userRoutes.post('/', (req, res) => {
  let newUser = {};
  //console.log(`POST /user`, '\n[body]->\n', req.body);

  try {
    newUser.name = getProperty(req, 'name');
    newUser.password = getProperty(req, 'password');
    newUser.email = getProperty(req, 'email');

    db.users.insert(newUser, (err, data) => {
      if (err) {
        return res.sendStatus(400);
      }
      //console.log('[response]->', data);
      res.status(201).json(data);
    });
  } catch(e) {
    //console.error(e);
    return res.sendStatus(400);
  }
});

// PUT
userRoutes.put('/:id', middleware.ensureAuthenticated, (req, res) => {
  let newData = {},
      id = parseInt(req.params.id);
  //console.log(`PUT /user/${id}`, '\n[body]->\n', req.body);

  newData.name = req.body.name;
  newData.password = req.body.password;
  newData.email = req.body.email;

  db.users.update(id, newData, (err, data) => {
    if (err) {
      //console.error(err);
      return res.sendStatus(404);
    }
    //console.log('[response]->', data);
    res.status(200).json(data);
  });
});

// DELETE
userRoutes.delete('/:id', middleware.ensureAuthenticated, (req, res) => {
  let id = parseInt(req.params.id);
  //console.log(`DELETE /user/${id}`);

  db.users.remove(id, (err, data) => {
    if(err) {
      //console.error(err);
      return res.sendStatus(404);
    }
    //console.log('[response]->', data);
    res.status(200).json(data);
  })
});

// Helper functions
function getProperty(req, prop) {
  if(req.body[prop]){
    return req.body[prop];
  }
  throw new Error(`Property "${prop} is not defined."`);
}

module.exports = userRoutes;
