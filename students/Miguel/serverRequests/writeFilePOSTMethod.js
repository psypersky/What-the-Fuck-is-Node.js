"use strict";

let http = require('http');
let fs = require('fs');

let server = http.createServer(function (request, response){
  if(request.method === "POST"){
    response.writeHead(200);
    let myFile = fs.createWriteStream("fileToBeWrited.txt");
    request.pipe(myFile);
    request.on('end', function(){
      let responseTextData;
      fs.readFile('fileToBeWrited.txt', 'utf8', function (err, data){
        if (err) {
          throw err;
        }
        responseTextData = data;
        response.write(responseTextData);
        response.end();
      });
    });
  } else {
      let responseText;
      response.writeHead(200, {'Content-type': 'text/html'});
      fs.readFile('index.html', function (err, data){
        if (err) {
          throw err;
        }
        responseText = data;
        response.write(responseText);
        response.end();
      });
  }
}).listen(8080);
