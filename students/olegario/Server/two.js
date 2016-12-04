"use strict"

var http = require('http');
var fs   = require('fs');

fs.readFile('./buzon.png', function (err, data) {
  http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
  }).listen(8080);
});
