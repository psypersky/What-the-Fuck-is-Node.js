"use strict";

const http = require("http"),
      fs = require("fs"),
      querystring = require("querystring"),
      cookies = require("cookies");

http.createServer(function(req, res) {
  var body = [],
      db = [
      {
        user: "Regina",
        pass: "fetch"
      },
      {
        user: "Gretchen",
        pass: "wednesday"
      }
    ];

  if (req.url === "/favicon.ico") {
    return;
  }

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream("login.html").pipe(res);
  }

  if (req.url === "/" && req.method === "POST") {
    body = [];
    req.on('data', function (bufferChunk) {
      body.push(bufferChunk);
    });
    req.on('end', function () {
      body = Buffer.concat(body).toString();
      body = querystring.parse(body);

      var user = db.find(function (element) {
        // console.log(element);
        return (element.user === body.user && element.pass === body.pass);
      });

      if (user) {
          res.writeHead(200, {"Content-Type" : "text/html"});
          fs.readFile('./welcome.html', function (err, data) {
            if (err){
              throw err;
            }
            data = data.toString();
            data = data.replace ("{}", body.user);
            res.end(data);
          });
      }
      else {
        res.writeHead(400, {"Content-Type" : "text/html"});
        res.write("No existes, bye.");
        res.end();
      }
      // console.log(body);
    });
  }

  if (req.url === "/signin" && req.method === "GET") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream("signin.html").pipe(res);
  }

  if (req.url === "/signin" && req.method === "POST") {
    req.on('data', function (bufferChunk){
      body.push(bufferChunk);
    });
    req.on('end', function () {
           body = Buffer.concat(body).toString();
           body = querystring.parse(body);
          //  newReg = {};
          //  console.log(body);
         });
  }

}).listen(8000);
console.log("Running");
