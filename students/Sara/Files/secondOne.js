"use strict"

let http=require('http');
let fs=require('fs');

http.createServer(function (request, response) {
  fs.readFile('./LittleJoy.txt', function (err, file) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(file)
    response.end();
  });
}).listen(3333);
