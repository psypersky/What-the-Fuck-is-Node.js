"use strict";

let http = require('http');
let fs =require('fs');

let server = http.createServer(function (request, response){

  if (request.method === "POST") {

    request.on('data', function (chunk){
      let responseText;

      fs.writeFile('fileToBeWrited.txt', chunk, function(err){
        if (err) {
          throw err;
        }

        response.writeHead(200, {"Content-type": "text/plain"});

        fs.readFile('fileToBeWrited.txt', 'utf8', function (err, data){
          if (err) {
            throw err;
          }
          responseText = data;

          response.statusCode = 200;

          //response.setHeader('Content-type', 'text/plain');

          response.write(responseText);

          response.end();
        });

      });
    }).on('error', function(err){
      console.error(err.stack);
    }).on('end', function(){
      console.log("POST");
    });

  } else {
    request.on('data', function (chunk){
      console.log(chunk);
    }).on('error', function(err){
      console.error(err.stack);
    }).on('end', function(){
      response.write('404: Not Found');
      response.end();
    });

  }

}).listen(8080);
