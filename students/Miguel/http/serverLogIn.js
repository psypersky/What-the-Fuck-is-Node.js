"use strict";

(function () {
  const http = require("http");
  const fs = require("fs");
  const usersDB = [
    {
      userName: "Migue",
      password: "holo123"
    },
    {
      userName: "Ruben",
      password: "MyPass"
    },
    {
      userName: "Apsel",
      password: "chale"
    },
    {
      userName: "Isaac",
      password: "tutonto"
    },
    {
      userName: "Ole",
      password: "amonoooos"
    },
    {
      userName: "Sara",
      password: "nomegusta"
    }
  ];

  let myServer = http.createServer( function( request, response ) {
    if (request.method === "GET") {
      let readStream = fs.createReadStream("login.html");
      response.writeHead(200, {"Content-type": "text/html"});
      readStream.pipe(response);
    } else if (request.method === "POST") {
      let body = [];
      request.on("data", function (chunk) {
        body.push(chunk);
      }).on("end", function(){
        body = body.toString();
        body = body.split("&");
        let user = body[0].split("=");
        let pass = body[1].split("=");
        user.shift();
        pass.shift();
        user = user.toString();
        pass = pass.toString();
        let flag = false;
        usersDB.find(function(elem){
          if (elem.userName === user && elem.password === pass) {
            flag = true;
          }
          return flag;
        });
        if (flag) {
          let readStream = fs.createReadStream("userWelcome.html");
          response.writeHead(200, {"Content-type": "text/html"});
          readStream.pipe(response);
        } else {
          let readStream = fs.createReadStream("wrongPassword.html");
          response.writeHead(200, {"Content-type": "text/html"});
          readStream.pipe(response);
        }
      });
    } else {
      response.writeHead(404);
      response.write("404: Route not found");
      response.end();
    }
  }).listen(8080);
})();
