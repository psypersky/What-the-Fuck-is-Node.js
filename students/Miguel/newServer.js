"use strict";

let http = require('http');
let responseBody = "";

let server = http.createServer(function (request, response){
  let method = request.method;
  let url = request.url;
  let headers = request.headers;
  let flag = true;
  // let body = [];

  request.on('data', function (chunk){
    body.push(chunk);
  }).on('end', function (){
    // body = Buffer.concat(body).toString();

    flag = url.match('/sum');

    if(flag && method === "GET"){
      response.on('error', function (err){
        console.error(err);
      });

      response.statusCode = 200;

      response.setHeader('Content-type', 'application/json');

      responseBody += url.split("/sum").join("");

      response.write(responseBody);
      response.end();
    } else {
      response.on('error', function (err){
        console.error(err);
      });

      response.statusCode = 404;

      response.write('Error 404: Route not found');

      response.end();
    }

  }).on('error', function(err){
    console.error(err.stack);
  });

}).listen(8080);
