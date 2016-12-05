"use strict"
let http=require('http');
let fs=require('fs');

http.createServer(function (request, response) {
  fs.readFile('./LittleJoy.txt', function (err, file) {
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;
    response.end(file);
  });
}).listen(3333);
