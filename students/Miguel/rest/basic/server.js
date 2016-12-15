"use strict";

const http = require('http');

let server = http.createServer();
let usersDB = [
  {
    id: 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq',
    username: 'Ruben',
    password: '1234',
  }
];

server.on("request", (request, response) => {
  const method = request.method,
        url = request.url;
  if (url === "/" && method === "GET") {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("My great web page");
  } else if (url === "/login" && method === "POST") {
    let body,
        user = '',
        flag;

    request.on("data", (chunk) => {
      user += chunk.toString();
    });

    request.on("end", () => {
      if (user) {
        user = JSON.parse(user);
        flag = usersDB.findIndex((elem) => {
          return elem.username === user.username && elem.password === user.password;
        });
      }

      if (flag >= 0) {
        response.writeHead(200, {"Content-Type": "application/json"});
        body = {
          status: 'success',
          data: {
            user: usersDB[flag]
          }
        };
        body = JSON.stringify(body);
        response.end(body);
      } else {
        body = {
          status: 'fail',
          data: { user: 'User or password invalid' }
        };
        body = JSON.stringify(body);
        response.writeHead(401, {"Content-Type": "application/json"});
        response.end(body);
      }
    })
  }
});

module.exports = server;
