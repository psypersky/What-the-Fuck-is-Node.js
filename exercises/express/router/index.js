var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var user = require('./routes/user')

app.use(bodyParser.json())

app.use('/user', user)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;