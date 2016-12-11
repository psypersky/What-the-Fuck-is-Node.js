"use strict";

let http = require('http');
let fs = require('fs');
let gzip = require('zlib').createGzip();

let server = http.createServer(function (request, response){
  if(request.method === "POST"){
    response.writeHead(200, {'Content-Type': 'application/zip', 'Content-disposition': 'attachment; filename=myFile.zip'});
    let myFile = fs.createWriteStream("fileToBeCompressed.txt");
    let fileCompressed = fs.createWriteStream("fileCompressed.zip");
    request.pipe(myFile);
    let fileGzip = request.pipe(gzip);
    fileGzip.pipe(fileCompressed);
    fileGzip.pipe(response);
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
