const express = require('express');
const router = express.Router();
const service = require('../service/service');
const dataBase = require('./json/dataBase');
const middleware = require('../middleware/middleware');


// router.all('*', (req, res, next) => {
//   if (!req.headers['auth-token']) {
//     res.status(400).json({error: 'pelas'});
//   } else {
//     next();
//   }
// });

router.get('/:id', middleware.ensureAuthenticated, (req, res) => {
// console.log(req.user.sub);
  // console.log(req.headers);
  var found = false;
  for (var i = 0; i < dataBase.length; i++) {
    console.log(dataBase[i]);
    if (dataBase[i].id === req.user.sub) {
      found = true;
      res.status(200).json(dataBase[i]);
    }
  }
  if (!found) {
    console.log("not ofund");
    res.status(404).end();
  }

});

router.post('', (req, res) => {
  console.log("inside Post");
  var uniqid = Date.now();
  uniqid = uniqid.toString();
  req.body.id = uniqid;
  dataBase.push(req.body)
  res.status(201).json(req.body);
});

router.put('/:id', middleware.ensureAuthenticated, (req, res) => {
  // console.log(req.headers);
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].id === req.user.sub) {
      dataBase[i].name = req.body.name;
      res.status(200).json(dataBase[i]);

    }
  }
});

router.delete('/:id', middleware.ensureAuthenticated, (req, res) => {
  // console.log(req.headers);
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].id === req.user.sub) {
      var del = dataBase.splice(i,1);
      console.log(dataBase);
      res.status(200).json(del);
    }
  }
});

module.exports = router;
