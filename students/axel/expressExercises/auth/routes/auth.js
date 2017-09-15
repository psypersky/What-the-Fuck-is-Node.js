const express = require('express');
const router = express.Router();
const service = require('../service/service');
const dataBase = require('./json/dataBase');
const middleware = require('../middleware/middleware');



router.post('', (req, res) => {
  console.log("Inside auth post");
  var user = req.body;
  // console.log(user);
  var found = dataBase.find( (current) => {
    if (current.id === user.id) {
      var token = service.createToken(current);
      var foo = {'auth-token': token};
      res.status(201).json(foo);
    }
  });
  });



module.exports = router;
