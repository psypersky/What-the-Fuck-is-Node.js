"use strict";

let http = require('http');
let fs = require('fs');

let server = http.createServer(function (request, response){
  request.on('end', function(){
    let responseText;
    fs.readFile('fileToBeReaded.txt', 'utf8', function (err, data){
      if (err) {
        throw err;
      }
      responseText = data;
      response.statusCode = 200;
      response.setHeader('Content-type', 'text/plain');
      response.write(responseText);
      response.end();
    });
  }); 
}).listen(8080);
