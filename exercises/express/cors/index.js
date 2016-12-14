var express = require('express')
var cors = require('cors')

var app = express()

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;
