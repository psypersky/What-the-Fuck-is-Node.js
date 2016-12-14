var express = require('express')
var router = express.Router()


var user = {
	id: 1,
	name: 'Cesar'
};


router.get('/', function (req, res) {
  res.json(user);
})

router.post('/', function (req, res) {
  res.status(201).json(req.body);
})
router.put('/:id', function (req, res) {
  res.json(req.body);
})
router.delete('/:id', function (req, res) {
  res.sendStatus(200);
})

module.exports = router