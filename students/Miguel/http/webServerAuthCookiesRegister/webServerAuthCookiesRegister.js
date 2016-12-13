"use strict";

const http = require('http'),
      fs = require('fs'),
      cookie = require('cookie'),
      querystring = require('querystring');

let usersDB = [
  {
    username: "Migue",
    password: "holo123",
    email: "miguedelgado9892@hotmail.com",
    telephone: ""
  }
];
let server = http.createServer();

server.listen(4000, () => { console.log("Listening in port 4000"); });

server.on("request", (request, response) => {

  const method = request.method,
        url = request.url,
        cookies = cookie.parse(request.headers.cookie || '');

  if (url === "/" && method === "GET") {
    if (cookies.username) {
      response.writeHead(302, {Location: "/user"});
      response.end();
    } else {
      response.writeHead(302, {Location: "/signup"});
      response.end();
    }
  } else if (url === "/user" && method === "GET") {
    if (cookies.username) {
      let readStream = fs.createReadStream("userWelcome.html");
      response.writeHead(200, {"Content-type": "text/html"});
      readStream.pipe(response);
    } else {
      response.writeHead(302, {Location: "/signup"});
      response.end();
    }
  } else if (url === "/signup" && method === "GET") {
    if (cookies.username) {
      response.writeHead(302, {Location: "/user"});
      response.end();
    } else {
      let readStream = fs.createReadStream("signUp.html");
      response.writeHead(200, {"Content-type": "text/html"});
      readStream.pipe(response);
    }
  } else if (url === "/signup" && method === "POST") {
    let body = "";
    request.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      body = querystring.parse(body);
      if (body.signup === 'Sign Up') {
        let errorJSON = {},
            user = {},
            flag = false;
        if (!body.email) {
          errorJSON.email = true;
        } else {
          errorJSON.email = false;
        }

        if (!body.username) {
          errorJSON.username = true;
        } else {
          errorJSON.username = false;
        }

        if (!body.password) {
          errorJSON.password = true;
        } else {
          errorJSON.password = false;
        }

        if (body.password.length < 6) {
          errorJSON.passwordLength = true;
        } else {
          errorJSON.passwordLength = false;
        }

        for (let key in errorJSON) {
          if (errorJSON[key]) {
            flag = errorJSON[key];
            break;
          }
        }

        if (flag) {
          response.writeHead(300, {"Content-type": "text/plain"});
          response.end(JSON.stringify(errorJSON));
        } else {
          user.username = body.username;
          user.password = body.password;
          user.email = body.email;
          user.telephone = body.telephone;
          usersDB.push(user);
          response.setHeader("Set-Cookie", ["username=" + user.username]);
          response.writeHead(302, {Location: "/user"});
          response.end();
        }

      } else if (body.signin === 'Sign In') {
        let flag = usersDB.find((elem) => {
          return elem.username === body.username && elem.password === body.password;
        });

        if (flag) {
          response.setHeader("Set-Cookie", ["username=" + flag.username]);
          response.writeHead(302, {Location: "/user"});
          response.end();
        } else {
          let errorJSON = [true];
          response.writeHead(300, {"Content-type": "text/plain"});
          response.end(JSON.stringify(errorJSON));
        }
      }
    });
  } else {
    response.writeHead(404, {"Content-type": "text/html"});
    response.end("<h1>404 Route not found</h1>");
  }
});
