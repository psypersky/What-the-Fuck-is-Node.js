var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var user = {
	id: 1,
	name: 'Cesar'
};

app.use(bodyParser.json())
var users = [];

app.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


app.all('/user', function(req, res, next) {
	if (!req.headers['auth-token']) {
		res.status(400).json({error: 'Not authorized'});
	}
	next();
})

app.get('/user', function (req, res) {
  res.json(user);
})

app.post('/user', function (req, res) {
  users.push(req.body);
  res.status(201).json(req.body);
})

app.put('/user/:id', function (req, res) {
  res.json(req.body);
})

app.delete('/user/:id', function (req, res) {
  res.sendStatus(200);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


module.exports = app;
